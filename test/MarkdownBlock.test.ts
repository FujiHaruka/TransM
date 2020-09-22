import { assertEquals } from "./_test-deps.ts";
import { TextBlock } from "../src/core/interfaces.ts";
import { MarkdownBlock } from "../src/core/MarkdownBlock.ts";

Deno.test("MarkdownBlock #1", () => {
  const markdown = "# title\n\nparagraph.\nparagraph.\n- item\n- item\n";
  const blocks: TextBlock[] = [
    {
      position: {
        start: {
          line: 1,
          offset: 0,
        },
        end: {
          line: 1,
          offset: 7,
        },
      },
      text: "# title",
    },
    {
      position: {
        start: {
          line: 3,
          offset: 9,
        },
        end: {
          line: 4,
          offset: 30,
        },
      },
      text: "paragraph.\nparagraph.",
    },
    {
      position: {
        start: {
          line: 5,
          offset: 31,
        },
        end: {
          line: 6,
          offset: 44,
        },
      },
      text: "- item\n- item",
    },
  ];
  const block = MarkdownBlock.parse(markdown);
  assertEquals(
    block.blocks(),
    blocks,
  );
});
