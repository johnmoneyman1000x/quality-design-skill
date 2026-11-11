# Project list as flat rows

Status: accepted 2026-10-06, Design lead. Logged in `../references/decision-log.md`.

## Frame

```
Who:      a team lead with 10 to 40 active projects
Job:      spot which projects need attention today
Outcome:  they can scan due dates and owners down one column without hunting
Not:      project thumbnails, inline task editing, drag to reorder
```

## Options

- A, grid of cards: each project a bordered card with name, owner, progress bar and due date. About 4 borders, 2 colours and 6 lines per project; 8 to 12 projects fit above the fold
- B, flat rows with hairlines: one 40px row per project, columns for name, owner, due date and status. One hairline per row, 1 colour; 18 to 20 projects fit above the fold
- C, cards grouped by status: like A, with a heading per status. Adds headings and still scans in two dimensions

## Decision

B. The job is comparison, and comparison needs aligned columns. Cards make the eye zigzag across a grid, and each card adds borders that carry no information (layout-no-card-in-card, edges-one-hairline).

## Details

- Row hover in `raise`, selected row with a 2px accent bar
- Status as text, coloured only for done and overdue (colour-one-primary)
- Sorted by due date, soonest first
- The project name truncates first at 1280 (layout-fits-1280)

## Known flaws

- Rows feel less inviting to new workspaces with two or three projects
- No room for a progress bar without adding a column
- Teams that think visually may ask for a board view; that is a separate decision, tracked in `../references/coverage-gaps.md` if it comes up
