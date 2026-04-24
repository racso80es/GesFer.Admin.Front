---
title: "VoltAgent Design Specification"
status: "draft"
---
# Specification
## Colors
- Abyss Black: `#050507` (Background)
- Carbon Surface: `#101010` (Card/Surface)
- Warm Charcoal Border: `#3d3a39` (Borders)
- Emerald Signal Green: `#00d992` (Primary Accent)
- VoltAgent Mint: `#2fd6a1` (Button Text)
- Snow White: `#f2f2f2` (Primary Text)

## Typography
- Primary Headings: `system-ui`
- Body/UI: `Inter`
- Code: `SFMono-Regular`

## Isolation Strategy
- VoltAgent theme overrides are isolated under the `.voltagent-theme` class wrapper.
- UI components will be implemented additively under `src/components/ui/v2/`.