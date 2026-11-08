#!/usr/bin/env python3
"""Write design-system/css/tokens.css from design-system/source/tokens.json.

Values are copied exactly. Published Semantic and Dimensions tokens keep the
css names from the export. Hidden primitives use those css names too, except
where a primitive and a published token share a css name: the published token
keeps the name and the primitive is stored as a private --raw-* base variable.
"""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOKENS_PATH = ROOT / "source" / "tokens.json"
OUT_PATH = ROOT / "css" / "tokens.css"

SLUG = {
    "Spacing": "spacing",
    "Radius": "radius",
    "Icon size": "icon-size",
    "Blur": "blur",
}


def coeff(value: object) -> str:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise TypeError(f"expected number, got {value!r}")
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
        slug = SLUG[token["collection"]]
        return f"--raw-{slug}-{token['css'][2:]}"
    return token["css"]


def declaration(token: dict, mode: str, index: dict, counts: Counter) -> str:
    alias = token["modes"][mode].get("alias")
    if alias:
        collection, name = alias.split(":", 1)
        target = index[(collection, name)]
        return f"var({var_name(target, counts)})"
    return literal(token, mode)


def comment(token: dict, mode: str) -> str:
    alias = token["modes"][mode].get("alias")
    hidden = " hidden" if token["hidden"] else ""
    alias_bit = f" alias {alias}" if alias else ""
    return f"/* {token['collection']} {token['name']}{hidden}{alias_bit} */"


def emit_props(tokens: list, mode_of, index: dict, counts: Counter, indent: str = "  ") -> list[str]:
    lines: list[str] = []
    for token in tokens:
        mode = mode_of(token)
        name = var_name(token, counts)
        value = declaration(token, mode, index, counts)
        lines.append(f"{indent}{comment(token, mode)}")
        lines.append(f"{indent}{name}: {value};")
    return lines


def main() -> None:
    data = json.loads(TOKENS_PATH.read_text())
    tokens = data["tokens"]
    if len(tokens) != data["count"]:
        raise SystemExit(f"expected {data['count']} tokens, found {len(tokens)}")
    index = {(token["collection"], token["name"]): token for token in tokens}
    counts = Counter(token["css"] for token in tokens)

    primitives = [token for token in tokens if token["hidden"]]
    dimensions = [token for token in tokens if token["collection"] == "Dimensions"]
    semantic = [token for token in tokens if token["collection"] == "Semantic"]
    colours = [token for token in tokens if token["collection"] == "Colour"]

    light_tokens = primitives + dimensions + semantic
    lines: list[str] = [
        "/* Generated from design-system/source/tokens.json.",
        "   Do not edit by hand. Run: python3 design-system/scripts/generate-tokens.py",
        f"   Source: {data['source']}. Exported {data['exported']}.",
        "   Published custom properties are Semantic (42) and Dimensions (29).",
        "   Hidden primitives are private base variables. Semantic colour aliases",
        "   resolve against the Colour collection Light scale. The Colour Dark",
        "   scale is the inverted style-sheet palette and is not the UI theme.",
        "   Where a hidden primitive shares a css name with a published token,",
        "   the published token keeps that name and the primitive is --raw-*. */",
        "",
        ":root,",
        '[data-theme="light"] {',
    ]
    current = None
    for token in light_tokens:
        if token["collection"] != current:
            current = token["collection"]
            lines.append("")
            lines.append(f"  /* {current} */")
        mode = "Light" if "Light" in token["modes"] else next(iter(token["modes"]))
        name = var_name(token, counts)
        value = declaration(token, mode, index, counts)
        lines.append(f"  {comment(token, mode)}")
        lines.append(f"  {name}: {value};")
    lines.append("}")
    lines.append("")
    lines.append("/* Colour collection, Dark mode. Inverted scale used by style-sheet")
    lines.append("   frames only. Do not set data-palette on the same element as")
    lines.append("   data-theme: semantic tokens alias the Light-scale primitives. */")
    lines.append('[data-palette="style-sheet"] {')
    for token in colours:
        value = literal(token, "Dark")
        lines.append(f"  {comment(token, 'Dark')}")
        lines.append(f"  {token['css']}: {value};")
    lines.append("}")
    lines.append("")
    lines.append('[data-theme="dark"] {')
    for token in semantic:
        value = declaration(token, "Dark", index, counts)
        lines.append(f"  {comment(token, 'Dark')}")
        lines.append(f"  {token['css']}: {value};")
    lines.append("}")
    lines.append("")
    lines.append("@media (prefers-color-scheme: dark) {")
    lines.append('  :root:not([data-theme="light"]) {')
    for token in semantic:
        value = declaration(token, "Dark", index, counts)
        lines.append(f"    {comment(token, 'Dark')}")
        lines.append(f"    {token['css']}: {value};")
    lines.append("  }")
    lines.append("}")
    lines.append("")
    OUT_PATH.write_text("\n".join(lines))
    print(f"wrote {OUT_PATH.relative_to(ROOT.parents[0])} ({len(tokens)} tokens)")


if __name__ == "__main__":
    main()
