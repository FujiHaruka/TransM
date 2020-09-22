import { assertEquals } from "./test-deps.ts";
import { MarkdownBlock, Block } from "../src/MarkdownBlock.ts";

Deno.test("parseBlock() #1", () => {
  const markdown = "# title\n\nparagraph.\nparagraph.\n- item\n- item\n";
  const blocks: Block[] = [
    {
      position: {
        start: {
          line: 1,
          offset: 0,
        },
        end: {
          line: 1,
          offset: 7
        },
      },
      text: "# title"
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
        }
      },
      text: "paragraph.\nparagraph."
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
        }
      },
      text: "- item\n- item"
    }
  ];
  const block = MarkdownBlock.parse(markdown)
  assertEquals(
    block.blocks(),
    blocks,
  );
});
