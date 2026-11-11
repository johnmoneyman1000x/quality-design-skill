---
name: writing-docs
description: Write or revise UI copy, docs, READMEs and agent guidance so they read plainly. Use whenever you edit a user-facing string or a markdown file.
---

# Writing docs

Write the way a careful teammate explains something. Say what is true today, in plain words, and stop.

## Voice

- Sentences of ordinary length, neither clipped fragments nor three-clause chains
- Concrete nouns over abstract ones. "The list shows overdue tasks" beats "the view exposes work items"
- "You" for the reader, "we" for how the team works, a named actor for everything else
- One term per thing, from `design-skill/references/glossary.md`
- A decision gets one sentence and its reason. No history, no status report

## UI copy

- Buttons say the action and its object: "New project", "Invite member"
- Empty states say what will appear, in one line
- Errors say what failed and what to do next, never just "Something went wrong"
- No subtitle that repeats the title (copy-say-it-once)
- Sentence case everywhere, including buttons and headings

## Punctuation and formatting

- No em or en dashes. Use a comma, a period or a new sentence
- No bold, no emoji, no arrows in prose
- Colons only before a list or a code block
- Bullets end without a period
- Backticks for file paths, commands and identifiers

## Words to avoid

| Avoid | Prefer |
| ----- | ------ |
| leverage, utilize | use |
| seamless, robust, powerful, simple, easy | delete, or name the property |
| ensure (as filler) | make sure, or state the fact |
| surface (as a verb) | show |
| canonical | the one, the shared |
| in order to | to |

Delete throat clearing ("It is important to note that") and any sentence that restates its heading.

## Before handing off

- Read it aloud in your head and rewrite anything you would not say to a colleague
- Search for dashes, `**` and each word in the avoid list
- Check every relative link points at a file that exists
