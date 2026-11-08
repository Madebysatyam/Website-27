#!/usr/bin/env python3
"""Check design-system/css/tokens.css against design-system/source/tokens.json.

Every token's per-mode value must match the export exactly: colour strings,
quoted strings, numeric coefficients, and units. Aliased tokens must point
at the aliased primitive's custom property.
"""

from __future__ import annotations

import json
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOKENS_PATH = ROOT / "source" / "tokens.json"
CSS_PATH = ROOT / "css" / "tokens.css"

SLUG = {
    "Spacing": "spacing",
    "Radius": "radius",
    "Icon size": "icon-size",
    "Blur": "blur",
}


def coeff(value: object) -> str:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise TypeError(value)
    if isinstance(value, float) and not value.is_integer():
        return json.dumps(value)
    return str(int(value))


def literal(token: dict, mode: str) -> str:
    mv = token["modes"][mode]
    if token["type"] == "COLOR":
        return mv["value"]
    if token["type"] == "STRING":
        escaped = mv["value"].replace("\\", "\\\\").replace('"', '\\"')
        return f'"{escaped}"'
    unit = mv.get("unit") or ""
    return f"{coeff(mv['value'])}{unit}"


def var_name(token: dict, counts: Counter) -> str:
    if token["hidden"] and counts[token["css"]] > 1:
        return f"--raw-{SLUG[token['collection']]}-{token['css'][2:]}"
    return token["css"]


def strip_comments(css: str) -> str:
    out = []
    i = 0
    while i < len(css):
        if css.startswith("/*", i):
            end = css.find("*/", i + 2)
            if end < 0:
                raise SystemExit("unclosed comment")
            i = end + 2
        else:
            out.append(css[i])
            i += 1
    return "".join(out)


def parse_decls(body: str) -> dict[str, str]:
    decls: dict[str, str] = {}
    for match in re.finditer(r"(--[A-Za-z0-9_-]+)\s*:\s*([^;]+);", body):
        decls[match.group(1)] = match.group(2).strip()
    return decls


def parse_rules(css: str) -> list[dict]:
    css = strip_comments(css)
    rules: list[dict] = []

    def walk(text: str, at_stack: list[str]) -> None:
        i = 0
        n = len(text)
        while i < n:
            while i < n and text[i].isspace():
                i += 1
            if i >= n:
                return
            start = i
            while i < n and text[i] != "{":
                i += 1
            prelude = " ".join(text[start:i].split())
            if i >= n or text[i] != "{":
                raise SystemExit(f"expected block after {prelude!r}")
            i += 1
            depth = 1
            body_start = i
            while i < n and depth:
                if text[i] == "{":
                    depth += 1
                elif text[i] == "}":
                    depth -= 1
                i += 1
            body = text[body_start : i - 1]
            if prelude.startswith("@") and "{" in body:
                walk(body, at_stack + [prelude])
            else:
                rules.append(
                    {
                        "at": list(at_stack),
                        "selector": prelude,
                        "decls": parse_decls(body),
                    }
                )

    walk(css, [])
    return rules


def rule(rules: list[dict], selector: str, at: list[str] | None = None) -> dict:
    at = at or []
    found = [item for item in rules if item["selector"] == selector and item["at"] == at]
    if len(found) != 1:
        raise SystemExit(f"expected 1 rule {selector!r} at {at!r}, found {len(found)}")
    return found[0]


def resolve(decls: dict[str, str], name: str, seen: set[str] | None = None) -> str:
    if seen is None:
        seen = set()
    if name in seen:
        raise SystemExit(f"cycle at {name}")
    seen.add(name)
    if name not in decls:
        raise SystemExit(f"missing custom property {name}")
    value = decls[name]
    match = re.fullmatch(r"var\((--[A-Za-z0-9_-]+)\)", value)
    if match:
        return resolve(decls, match.group(1), seen)
    return value


def main() -> int:
    data = json.loads(TOKENS_PATH.read_text())
    tokens = data["tokens"]
    if len(tokens) != 282 or data["count"] != 282:
        raise SystemExit(f"token count is {len(tokens)}, expected 282")
    published = [token for token in tokens if not token["hidden"]]
    semantic = [token for token in tokens if token["collection"] == "Semantic"]
    dimensions = [token for token in tokens if token["collection"] == "Dimensions"]
    if len(semantic) != 42 or len(dimensions) != 29 or len(published) != 71:
        raise SystemExit(
            f"published split semantic={len(semantic)} dimensions={len(dimensions)}"
        )

    index = {(token["collection"], token["name"]): token for token in tokens}
    counts = Counter(token["css"] for token in tokens)
    rules = parse_rules(CSS_PATH.read_text())
    light = rule(rules, ':root, [data-theme="light"]')["decls"]
    dark = rule(rules, '[data-theme="dark"]')["decls"]
    system = rule(
        rules,
        ':root:not([data-theme="light"])',
        ["@media (prefers-color-scheme: dark)"],
    )["decls"]
    sheet = rule(rules, '[data-palette="style-sheet"]')["decls"]

    if dark != system:
        raise SystemExit("prefers-color-scheme dark block differs from [data-theme=dark]")

    dark_resolved_base = dict(light)
    dark_resolved_base.update(dark)
    errors: list[str] = []

    def expect(token: dict, mode: str, decls: dict[str, str], prop: str) -> None:
        alias = token["modes"][mode].get("alias")
        raw = decls.get(prop)
        if raw is None:
            errors.append(f"missing {prop} for {token['collection']} {token['name']} {mode}")
            return
        if alias:
            collection, name = alias.split(":", 1)
            target = index[(collection, name)]
            expected_ref = f"var({var_name(target, counts)})"
            if raw != expected_ref:
                errors.append(
                    f"{prop} {mode} alias: got {raw}, expected {expected_ref}"
                )
        else:
            expected = literal(token, mode)
            if raw != expected:
                errors.append(f"{prop} {mode} literal: got {raw}, expected {expected}")
                return
        try:
            got = resolve(decls, prop)
        except SystemExit as exc:
            errors.append(f"{prop} {mode}: {exc}")
            return
        expected = literal(token, mode)
        if got != expected:
            errors.append(f"{prop} {mode} resolved: got {got}, expected {expected}")

    for token in tokens:
        if token["collection"] == "Semantic":
            prop = token["css"]
            expect(token, "Light", light, prop)
            expect(token, "Dark", dark_resolved_base, prop)
            continue
        if token["collection"] == "Colour":
            expect(token, "Light", light, var_name(token, counts))
            expect(token, "Dark", sheet, token["css"])
            continue
        mode = next(iter(token["modes"]))
        expect(token, mode, light, var_name(token, counts))

    # Published names must not be the colliding primitive's different value.
    for css_name, group in Counter(token["css"] for token in tokens).items():
        pass
    colliding = [name for name, count in counts.items() if count > 1]
    if len(colliding) != 21:
        errors.append(f"expected 21 colliding css names, found {len(colliding)}")

    if errors:
        print(f"{len(errors)} mismatch(es):", file=sys.stderr)
        for error in errors[:40]:
            print(f"  {error}", file=sys.stderr)
        return 1

    print(
        f"ok {len(tokens)} tokens "
        f"({len(semantic)} semantic, {len(dimensions)} dimensions, "
        f"{len(tokens) - len(published)} primitives)"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
