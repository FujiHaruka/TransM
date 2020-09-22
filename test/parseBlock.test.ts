import { assertEquals } from "./test-deps.ts";
import { parseBlock, Block } from "../src/parseBlock.ts";

Deno.test("parseBlock() #1", () => {
  const markdown = "# title\n\nparagraph.\nparagraph.\n- item\n- item";
  const blocks: Block[] = [{ start: 1, end: 1 }, { start: 3, end: 4 }, { start: 5, end: 6 }];
  assertEquals(
    parseBlock(markdown),
    blocks,
  );
});
