# Testing the skill

A skill works if it changes what the agent builds. These fixtures check that.

## How to run

1. Pick a fixture from `fixtures.json`
2. Run the prompt twice on the same branch: once with the skill loaded, once without
3. Render both results and compare the screenshots, not the agent's summaries. Agents describe what they meant to do, not what they did
4. Check each result against the fixture's `must` and `mustNot`, and note which rule ids the agent cited
5. A fixture passes when the run with the skill meets every `must` and no `mustNot`, and the run without it is visibly worse or the same

## Kinds

- training: requests the skill was written against. If these fail, a rule is unclear
- holdout: requests written after the rules and never used to edit them. These show whether the skill generalizes or just memorized the training set
- trigger: checks the skill loads (or stays unloaded) for the right requests

When a fixture fails, fix the rule or the routing in `SKILL.md`, not the fixture. Move a holdout fixture to training only after you have edited the skill because of it.
