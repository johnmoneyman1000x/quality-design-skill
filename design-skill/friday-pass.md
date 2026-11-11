# Friday pass

Once a week, gather the design feedback you gave (review comments, chat messages, notes from walking the app) and run this prompt over it. It turns notes into proposals. A human decides what becomes a rule.

## Prompt

```
Here is this week's design feedback. For each note:

1. Quote it exactly, with where it came from.
2. Check design-skill/references/rules.md and say whether an existing rule
   already covers it. Name the rule id if so.
3. Rewrite it as something visible on screen (what a person would see
   that is wrong, and what they would see when it is fixed).
4. Suggest one destination: new rule, edit to an existing rule, exemplar,
   lint check, test fixture, coverage gap, or nothing.
5. Skip notes that are only an adjective ("cleaner", "more modern") with
   no visible change behind them, and list them at the end as skipped.

Do not edit any files. Output a table I can review.
```

## Recording decisions

For each proposal you accept:

- Make the change in the destination file (rule, exemplar, `scripts/design-lint.ts`, `tests/fixtures.json`, or `references/coverage-gaps.md`)
- Add one row to `references/decision-log.md` with the date, the decision, the rule id or file, and the approver
- If the same note shows up for the third week and code can find it with a text search, propose a lint check

Rejected proposals need no record. If one keeps coming back, add it to `coverage-gaps.md` so the question is visible.
