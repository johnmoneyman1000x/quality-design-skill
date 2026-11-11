# Quality design skill

An example design skill and `DESIGN.md` for Acme, a fictional B2B project-tracking web app. It shows how to give a coding agent the design judgment it lacks: what each screen is for, the rules your team already agreed on, and a lint script that catches the mistakes you keep flagging.

Acme has four screens (Projects, Project detail, Activity, Settings). Everything about Acme is made up. Swap it for your product.

## Structure

- `AGENTS.md` tells any coding agent when to load the skill
- `CLAUDE.md` points Claude Code at `AGENTS.md`
- `DESIGN.md` holds the visual tokens and a short style guide
- `design-skill/SKILL.md` is the entry point: modes, what to load, how to decide and verify
- `design-skill/AGENTS.md` covers load order and how a rule enters the skill
- `design-skill/references/product-judgment.md` is how to frame and decide a change
- `design-skill/references/rules.md` lists the agreed rules, five repeat offenders first
- `design-skill/references/surfaces.md` gives each screen one job and one primary action
- `design-skill/references/glossary.md` keeps one term per thing
- `design-skill/references/resilience.md` is the edge-case checklist
- `design-skill/references/ux-laws.md` ties a few UX laws to rule ids
- `design-skill/references/coverage-gaps.md` lists questions with no answer yet
- `design-skill/references/decision-log.md` records accepted changes
- `design-skill/exemplars/` holds two decisions written in full
- `design-skill/tests/` holds prompts to check the skill changes what the agent builds
- `design-skill/friday-pass.md` is the weekly prompt that turns review notes into rules
- `writing-docs/SKILL.md` is a short house style for UI copy and docs
- `scripts/design-lint.ts` checks the rules that code can find with a text search
- `src/example/` has a component with deliberate violations so you can see the lint run

## How to use it in your repo

1. Copy `design-skill/` into your repo, or into `.claude/skills/` if you use Claude Code skills
2. Add the trigger from `AGENTS.md` to your root `AGENTS.md` (and a `CLAUDE.md` that reads it)
3. Swap Acme's screens, glossary and rules for yours. Keep the rule format and the ids stable
4. Start with the five repeat-offender rules in `references/rules.md`. Replace them with the five notes you leave most often in design review
5. Copy `scripts/design-lint.ts`, add the `lint:design` script, and run it

```sh
npm run lint:design
# or
node --experimental-strip-types scripts/design-lint.ts src
```

Node 22.6 or later runs the TypeScript directly.

## Start here vs add later

Start with:

- `AGENTS.md` trigger, `SKILL.md`, `rules.md` with five rules, `surfaces.md`
- `DESIGN.md` tokens, so the agent stops inventing colours

Add later, once the basics hold:

- The lint script, for rules you have flagged three times
- `tests/` fixtures, once you change the skill often enough to need a check
- Exemplars, when a decision keeps getting relitigated
- The Friday pass and decision log, when review notes pile up faster than you can turn them into rules

By John Ma. Written up in [AI Artifact](https://johnmaartifacts.substack.com).

MIT licensed, see `LICENSE`.
