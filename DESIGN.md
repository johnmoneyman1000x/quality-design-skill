---
name: Acme
description: Project tracking for small B2B teams. Quiet, dense, black and white with one blue.
colors:
  ink: "#111111"
  muted: "#6B6B6B"
  divider: "#E4E4E4"
  divider-strong: "#CFCFCF"
  surface: "#FFFFFF"
  raise: "#F7F7F7"
  primary: "#111111"
  accent: "#2563EB"
  success: "#15803D"
  danger: "#B91C1C"
typography:
  title: { size: 18px, weight: 600, line-height: 24px }
  body: { size: 14px, weight: 400, line-height: 20px }
  label: { size: 13px, weight: 500, line-height: 18px }
  meta: { size: 12px, weight: 400, line-height: 16px }
spacing:
  unit: 4px
  scale: [4, 8, 12, 16, 24, 32, 48]
radii:
  tag: 4px
  control: 6px
  pane: 8px
icons:
  inline: 16px
  control: 20px
---

# Acme design

## Overview

Acme helps a team see which projects are on track and who owns the next task. The interface stays out of the way: white panes, black text, hairline edges, and one blue that marks where you are. Density beats decoration. A screen should read from its type and spacing before any box or fill.

## Colors

- `ink` for text and the one primary button per screen
- `muted` for meta text, placeholders and secondary icons
- `divider` for every hairline, `divider-strong` for field borders and the focus ring
- `surface` for panes, `raise` for hover, selected rows and the app background
- `accent` blue only for position and what is next: the selected nav item, the active tab, a link, an unread dot
- `success` and `danger` only for an outcome: done, overdue, failed
- In dark mode each token swaps value; components never pick a colour of their own

## Typography

- One family, the system sans stack
- 18 title, once per screen
- 14 body for content and table cells
- 13 label for buttons, tabs, nav and field labels
- 12 meta for timestamps, counts and helper text, never smaller
- Weight 600 for titles and section headings, 500 for labels, 400 for everything else

## Layout

- 4px spacing scale. Common gaps are 8 inside a control, 12 between rows, 24 between sections
- Fixed 240px sidebar, content fills the rest, max line length about 72 characters
- Every screen works at 1280 wide with the sidebar open, and is designed at 1440

## Elevation & Depth

- Flat by default. Panes are separated by a `divider` hairline, not a shadow
- Only floating layers cast a shadow: menus, popovers, tooltips, dialogs
- On dark, the `raise` fill separates panes and hairlines stay at `divider`

## Shapes

- 4px on tags, chips and key caps
- 6px on buttons, inputs and selects
- 8px on panes, menus and dialogs
- Icons are 16px inline with text and 20px in buttons and nav

## Components

- Button: primary (ink fill), secondary (surface fill, `divider-strong` border), ghost (no border). One primary per screen
- IconButton: 32px square, 20px icon, a required `label` that is its accessible name and tooltip
- Table row: 40px tall, hairline between rows, hover in `raise`, selected with a 2px accent bar on the left
- Tabs: 13 label, active tab in ink with a 2px accent underline
- Empty state: one line saying what will appear here, plus at most one action
- Card: only at the top level of a pane, never inside another card

## Do's and Don'ts

- Do use a hairline and a semibold heading to group a section
- Do let spacing do the grouping before you add a border
- Do keep one black button per screen
- Don't put a card inside a card
- Don't lighten borders with opacity (`border-black/5`); use `divider`
- Don't size icons above 20px outside an empty-state illustration
- Don't repeat the title in a subtitle
- Don't introduce a hex value; add a token instead
