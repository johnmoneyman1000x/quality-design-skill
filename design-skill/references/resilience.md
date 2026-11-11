# Resilience

Take a screen through every case it can reach before calling it done.

## Content

- A name of 80 characters, and one of a single character
- Zero, one, and 1,000 rows
- Counts over 999 (show "1.2k" or the full number, decide once)
- Missing optional fields (no owner, no due date, no avatar)
- Non-English text, including right-to-left if supported

## States

- Loading, with a skeleton that matches the final layout
- Empty, following states-empty-one-line
- Error, saying what failed and what to do next
- No permission, saying who can grant it
- Offline or a slow network, with the last known data still visible

## Layout

- 1280 and 1440 wide, sidebar open (layout-fits-1280)
- Light and dark
- Browser zoom at 200%
- A pane that scrolls on its own instead of the whole page

## Interaction

- Keyboard only: every control reachable, focus visible, Escape closes what opened
- Double-click and repeated submit do not create duplicates
- Undo or confirm for anything destructive
