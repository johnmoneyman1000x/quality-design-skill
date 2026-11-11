# Design skill guide for agents

## Load order

1. The repo root `AGENTS.md`
2. `design-skill/SKILL.md` for any visible change
3. The references `SKILL.md` routes you to for the task and screen
4. `../writing-docs/SKILL.md` before editing user-facing strings or markdown

Report which files you loaded in verify and review output.

## How a rule enters

A rule enters `references/rules.md` only from an accepted decision with evidence (a repeated review note, a design review outcome, or a cited source), written in terms you can see on screen, with an id, scope, rule, source, why, exceptions, and a bad and a good example.

- A decision worth reading in full goes to `exemplars/`
- A misread request becomes a fixture in `tests/fixtures.json`
- An open question goes to `references/coverage-gaps.md`
- Every accepted change gets one line in `references/decision-log.md`

One screenshot or one comment is evidence, not acceptance. The design lead approves new rules. Nothing here changes on an agent's own authority.

## Lint or written rule

Once you've flagged the same mistake three times and code can find it with a text search, make it a lint check. If a check keeps needing ignore comments, move it back to a written rule.

Anything that needs product context or a rendered screen stays a written rule.

## Validation

- `npm run lint:design` after any UI change
- Render changed screens at 1280 and 1440, light and dark
- After editing the skill, run the fixtures in `tests/` as described in `tests/README.md`
