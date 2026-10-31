# copy-texts

A tiny static page with texts and commands you need to copy, each with a big "Копировать" button.
Works on phones: if the clipboard API is blocked, the text is selected so you can copy it by hand.

## Add or change a text
Edit `texts.json` (`texts` array: `id`, `title`, `where`, `text`) and push. `{{key}}` placeholders are
filled from the "Мои данные" box on the page; the values live only in the visitor's browser
(localStorage) and are never sent anywhere. Define new placeholders in the `variables` array.

The site is public (GitHub Pages on a free plan), so never put secrets, tokens, passwords or personal data
into `texts.json`; use placeholders instead.

## Test
`npm test` (Node 20+, no dependencies) runs the placeholder-filling tests.
