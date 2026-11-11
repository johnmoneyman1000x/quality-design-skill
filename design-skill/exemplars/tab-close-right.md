# Tab close button on the right

Status: accepted 2026-10-20, Design lead. Logged in `../references/decision-log.md`.

## Frame

```
Who:      a member with several files open in Project detail
Job:      close the tabs they are done with
Outcome:  they can close a tab without opening the wrong one first
Not:      tab reordering, pinning or overflow menus
```

## Options

- A, close on the left: matches some desktop apps, but the first click target in every tab becomes a destructive one. Adds one icon per tab
- B, close on the right: matches browsers and most editors, where users already look for it. Adds one icon per tab, shown on hover and on the active tab
- C, no close button: closing through a menu or keyboard only. Adds no icons, but adds a step and hides the action

## Decision

B. Users expect close on the right from their browser (Jakob's law), and keeping it off the left edge means a click aimed at the tab label never closes it.

## Details

- 16px icon inside a 20px hit area (icons-sized-by-role)
- Visible on the active tab and on hover; always reachable by keyboard
- `IconButton` with `label="Close tab"` (controls-icon-button-label)
- Middle-click also closes

## Known flaws

- Hover-only visibility hides the action on touch screens; revisit if Acme supports tablets
- With many tabs open, the close icon eats into an already short label
- A user who closes the wrong tab has no undo yet
