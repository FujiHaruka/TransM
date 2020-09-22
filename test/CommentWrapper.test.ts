import { assert, assertEquals } from "./_test-deps.ts";
import { TextBlock } from "../src/core/interfaces.ts";
import { CommentWrapper } from "../src/core/CommentWrapper.ts";

Deno.test("CommentWrapper #1", () => {
  const block: TextBlock = {
    text: "# title",
    position: {
      start: {
        line: 1,
        offset: 0,
      },
      end: {
        line: 2,
        offset: 0,
      },
    },
  };
  const html = `<!-- L1..2
# title
-->`;
  assertEquals(
    CommentWrapper.wrap(block),
    html,
  );
  assert(CommentWrapper.is(html));
  assertEquals(
    CommentWrapper.unwrap(html),
    "# title",
  );
});

Deno.test("CommentWrapper #2", () => {
  const block: TextBlock = {
    text: "- foo\n- bar\n- baz",
    position: {
      start: {
        line: 1,
        offset: 0,
      },
      end: {
        line: 3,
        offset: 0,
      },
    },
  };
  const html = `<!-- L1..3
- foo
- bar
- baz
-->`;
  assertEquals(CommentWrapper.wrap(block), html);
  assert(CommentWrapper.is(html));
  assertEquals(
    CommentWrapper.unwrap(html),
    "- foo\n- bar\n- baz",
  );
});

Deno.test("CommentWrapper #3", () => {
  assert(!CommentWrapper.is(""));
  assert(!CommentWrapper.is("<!-- html -->"));
  assert(
    !CommentWrapper.is(`<!-- L1..2
foo
-->
`),
  );
});
