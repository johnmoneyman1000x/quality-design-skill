---
name: design-skill
description: How we make and check design decisions in Acme (Projects, Project detail, Activity, Settings). Load before any change to a screen, control, colour, label, layout or state, and for any design review. Skip for backend work and docs that are not product copy.
---

# Acme design skill

A change to what a user sees is a decision first and styling second. `references/product-judgment.md` is how we decide, `references/rules.md` is what we already decided, and `references/coverage-gaps.md` is what is still open. Visual tokens live in `../DESIGN.md`. Copy follows `../writing-docs/SKILL.md`. How rules enter the skill is in `AGENTS.md`.

## Operating contract

- Start with the job, not the pixels: who acts, on which screen, and what changes for them
- Separate facts from decisions, and name assumptions instead of hiding them in code
- Decide structure before decoration: layout, component and states before colour or copy polish
- A URL, screenshot or file names the scope; it does not authorize edits unless the mode does
- Use evidence, not taste: tie each choice to a rule id, an exemplar or a shipped pattern
- Shipped code shows what exists, not what was decided; check it against the rules

## Modes

Pick the mode from the user's verb. When unsure, take the narrowest one.

- Shape: a new screen, flow or control. Frame it, compare options, write the decision record, ask before building
- Implement: the request names the change. Build the smallest version and cite rule ids. A material change gets a decision record first
- Review: look at the rendered result and report findings. Do not edit unless asked
- Copy: labels, empty states and errors through `../writing-docs/SKILL.md` and `references/glossary.md`
- Harden: take a finished screen through `references/resilience.md`, both themes and both widths

A change is material when it changes the user's task, a default, navigation, the controls on screen, or which states can appear.

## Need, then load

Load only what the task needs.

| Need | Load |
| ---- | ---- |
| A product or flow decision | `references/product-judgment.md`, then `references/rules.md` |
| A specific screen | its section in `references/surfaces.md` |
| Colours, type, spacing, radii | `../DESIGN.md` |
| Justify grouping, layout or disclosure | `references/ux-laws.md` with a rule id |
| Labels, empty states, errors | `references/glossary.md`, `../writing-docs/SKILL.md` |
| Long names, empty, loading, error, dark, 1280 | `references/resilience.md` |
| No rule covers it | `references/coverage-gaps.md` |
| A decision written in full | `exemplars/` |
| Check the skill still works | `tests/README.md` |

## Deciding

1. Frame it in four lines (who, job, outcome, not) from `product-judgment.md`
2. List the states the screen can reach before styling any of them
3. Try the smallest change first: a better default, removing something, a shipped pattern, the words, and only then new UI
4. Compare two or three options by counting rows, borders, colours, states and words, then pick one with a reason
5. Check it against `surfaces.md`: one job and one primary per screen
6. Write the decision record; accepted records become rules, open ones become gaps

## When sources disagree, the earlier wins

1. The user's ask
2. The rendered screen and its real data
3. This skill (`rules.md`, `surfaces.md`, `exemplars/`)
4. Shipped patterns in the codebase
5. General guidance, such as public design skills and UX laws

## Review output

Lead with findings ordered by impact on the user. Each finding gives the location (file and line, or screen region), whether you saw it or inferred it, the rule id, an optional UX law only alongside that rule id, the cost to the user, and one smallest fix.

- P0: blocks the main task, a severe accessibility failure, or data loss
- P1: likely task failure, a misleading action, a missing critical state, or a broken layout at 1280
- P2: real friction, inconsistency or weak hierarchy
- P3: a minor craft nit

## Verify

- Run `npm run lint:design`
- Render the changed screen; never claim visual quality from reading code
- Check light and dark, at 1280 and 1440 wide
- Look for clipped labels, doubled lines, a whole page scrolling instead of a pane, and missing dark styles
- Report what you looked at, which skill files you loaded, the rule ids you checked, and what you could not verify
