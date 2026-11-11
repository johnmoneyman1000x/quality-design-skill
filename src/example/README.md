# Example violations

`ProjectCard.tsx` breaks the design rules on purpose so you can see the lint output. Run `npm run lint:design` from the repo root.

It contains a card inside a card, a 24px icon, an opacity border, an 11px text size, a raw hex colour, an off-scale margin, and an `IconButton` with no label. The 48px star shows how an allow comment marks an accepted exception, and the second `IconButton` shows the passing version.

This file is not meant to compile; `../ui` and `../icons` do not exist.
