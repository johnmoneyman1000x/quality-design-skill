# Product judgment

How to decide a change before building it.

## Each screen's job

- Projects: see which projects need attention today
- Project detail: move one project forward by assigning and finishing tasks
- Activity: catch up on what changed since you last looked
- Settings: change who is in the workspace and how it behaves

If a change does not help that job, it probably belongs on another screen or nowhere. See `surfaces.md` for each screen's primary action.

## Frame it in four lines

```
Who:      the person acting (e.g. a team lead with 12 active projects)
Job:      what they are trying to get done on this screen
Outcome:  what they can see or do afterwards that they could not before
Not:      what this change deliberately leaves out
```

If you cannot fill all four, ask before building.

## Smallest change ladder

Try each step in order and stop at the first that works.

1. A better default (sort, filter, which tab opens first)
2. Remove something (a column, a line of text, a border)
3. Reuse a shipped pattern from another screen
4. Change the words
5. Add UI, quietest first: text, then an inline control, then a menu item, then a button, then a panel

## Compare options by counting

For each option, count what it adds or removes:

- rows or lines of text
- borders
- colours
- states (loading, empty, error, selected)
- words

The option with fewer of each usually wins. If a heavier option wins, say why in one sentence.

## Decision record

```
Decision:     one sentence
Frame:        who, job, outcome, not
Options:      A, B, C, one line each with its counts
Chosen:       the option and the reason
Rules:        ids this follows or creates
Known flaws:  what this option gets wrong and when we would revisit
Status:       proposed | accepted (date, approver)
```

Known flaws are required. A record with no flaws has not been thought through.
