# Rules

Each rule is a decision we made. Cite it by id. When code and a rule disagree, the rule wins until we change it through `../AGENTS.md`.

A comment reading `design-lint allow <id>` within three lines above a line marks an accepted lint exception.

## The five repeat offenders

These are the notes we left most often in review. Start here.

### layout-no-card-in-card

- Scope: panes, cards, sections, list items
- Source: Repeated review note
- Rule: no card inside a card. A group inside a card is a heading and a hairline, not another box
- Why: nested boxes add borders and padding without adding meaning, and the content shrinks
- Exceptions: a dialog may contain one card-like preview of the thing it acts on
- Bad: a stats `Card` inside the project `Card`
- Good: the project `Card`, then a hairline and a semibold "Stats" heading
- Checked by: lint (layout-no-card-in-card)

### icons-sized-by-role

- Scope: every icon
- Source: Repeated review note
- Rule: 16px inline with text, 20px in buttons and nav. Nothing larger except an empty-state illustration
- Why: oversized icons outweigh the labels they sit beside and make a dense screen look unfinished
- Exceptions: the empty-state illustration, with an allow comment
- Bad: `<FolderIcon size={24} />` beside a 14px project name
- Good: `<FolderIcon size={16} />`
- Checked by: lint (icons-sized-by-role)

### edges-borders-visible

- Scope: borders, dividers, field outlines
- Source: Repeated review note
- Rule: borders use `divider` or `divider-strong`. Never lighten one with opacity (`border-black/5`) or a custom light grey
- Why: a border too faint to see on a normal monitor does no work, and opacity borders break in dark mode
- Exceptions: none
- Bad: `border border-black/5`
- Good: `border border-divider`
- Checked by: lint (edges-borders-visible)

### edges-one-hairline

- Scope: panes, sections, tables, headers
- Source: Design review
- Rule: one line between two regions. A border never duplicates a pane edge, and where two borders would touch, keep one
- Why: doubled lines read as a mistake and make the layout look heavier than it is
- Exceptions: a sticky table header may keep its bottom border while scrolled
- Bad: a table with a top border directly under a header that has a bottom border
- Good: the header's bottom border only
- Checked by: lint (layout-no-card-in-card catches the nested case) and review

### copy-say-it-once

- Scope: titles, subtitles, helper text, summaries
- Source: Repeated review note
- Rule: no subtitle that repeats the title, each fact shown once per screen, and the same summary not repeated across screens
- Why: repeated text costs reading time and hides the one line that is new
- Exceptions: a dialog title may repeat the button that opened it
- Bad: title "Projects", subtitle "View and manage your projects"
- Good: title "Projects" and no subtitle
- Checked by: review

## Other rules

### colour-one-primary

- Scope: every screen and dialog
- Source: Design review
- Rule: one black primary button per screen. Blue marks position and what is next; green and red mark outcomes only
- Why: the user finds the next step by looking for the one black button
- Exceptions: an open dialog carries its own primary
- Bad: a blue "New project" next to a green "Invite"
- Good: a black "New project" and a secondary "Invite"
- Checked by: review

### colour-tokens-only

- Scope: all styles outside `src/styles/`
- Source: Design review
- Rule: no hex, rgb or hsl values. A new shade is a new token in `DESIGN.md`
- Why: hard-coded colours drift and break dark mode
- Exceptions: brand logos in `src/assets/`
- Bad: `color: #6b7280`
- Good: `text-muted`
- Checked by: lint (colour-tokens-only)

### type-min-12

- Scope: all text
- Source: Design review
- Rule: nothing under 12px. Use the four roles in `DESIGN.md`
- Why: smaller text fails on ordinary screens and for many readers
- Exceptions: none
- Bad: `text-[11px]`
- Good: `text-xs` (12px meta)
- Checked by: lint (type-min-12)

### layout-spacing-scale

- Scope: padding, margin, gap
- Source: Design review
- Rule: arbitrary spacing values are multiples of 4, or carry an allow comment saying what they align to
- Why: off-scale gaps make rows misalign by a pixel or two
- Exceptions: alignment to an icon centre, with an allow comment
- Bad: `pl-[17px]`
- Good: `pl-4`
- Checked by: lint (layout-spacing-scale)

### disclosure-summary-first

- Scope: lists, activity entries, settings sections
- Source: Design review
- Rule: show the summary first and the detail on click. At most two levels of expansion; deeper detail opens in a side panel
- Why: users scan before they read, and a third indent is unreadable at pane width
- Exceptions: none
- Bad: every activity entry fully expanded
- Good: one line per entry, the diff behind a chevron
- Checked by: review

### states-empty-one-line

- Scope: empty lists, empty panels, zero results
- Source: Design review
- Rule: one line saying what will appear here, and at most one action
- Why: an empty state is a moment to point at the next step, not to explain the feature
- Exceptions: a first-run workspace may add one illustration
- Bad: an icon, a heading, two paragraphs and three buttons
- Good: "Tasks you are assigned will appear here." and a "New task" button
- Checked by: review

### controls-icon-button-label

- Scope: every `IconButton`
- Source: Design review
- Rule: every `IconButton` has a `label`, which is its accessible name and its tooltip
- Why: an icon alone is a guess for sighted users and silent for screen readers
- Exceptions: none
- Bad: `<IconButton icon={MoreIcon} />`
- Good: `<IconButton icon={MoreIcon} label="More actions" />`
- Checked by: lint (controls-icon-button-label)

### layout-fits-1280

- Scope: headers, toolbars, tab strips, tables
- Source: Design review
- Rule: nothing clips at 1280 wide with the sidebar open. Free text truncates first, then secondary controls collapse into a menu; the primary keeps its full label
- Why: a clipped primary button is the one action the user cannot find
- Exceptions: none
- Bad: "New proj" cut off at 1280
- Good: the filter chips folded into "Filters" and "New project" whole
- Checked by: review
