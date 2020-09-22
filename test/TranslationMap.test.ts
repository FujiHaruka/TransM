import { assertEquals } from "./_test-deps.ts";
import { TextBlock } from "../src/core/interfaces.ts";
import { MarkdownBlock } from "../src/core/MarkdownBlock.ts";
import { TranslationMap } from "../src/core/TranslationMap.ts"

Deno.test("TranslationMap #1", () => {
  const markdown = `
<!-- L1..1
# title
-->

# title

<!-- L3..3
paragraph.
-->

paragraph.

<!-- L5..6
- list
- item
-->

- list
- item
`
  // TranslationMap.parse(markdown)
});
