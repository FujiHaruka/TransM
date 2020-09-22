import { assertEquals } from "./_test-deps.ts";
import { MarkdownBlock } from "../src/core/MarkdownBlock.ts";
import { TranslationText } from "../src/core/TranslationText.ts";

Deno.test("TranslationText.create() #1", () => {
  const markdown = "# title\n\nparagraph.\nparagraph.\n- item\n- item\n";
  const block = MarkdownBlock.parse(markdown);
  const translation = TranslationText.create(block.blocks());
  assertEquals(
    "\n" + translation.toString(),
    `
<!-- L1..1
# title
-->

# title

<!-- L3..4
paragraph.
paragraph.
-->

paragraph.
paragraph.

<!-- L5..6
- item
- item
-->

- item
- item
`,
  );
});
