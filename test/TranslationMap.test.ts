import { assertEquals } from "./_test-deps.ts";
import { TranslationMap } from "../src/core/TranslationMap.ts";

Deno.test("TranslationMap #1", () => {
  const markdown = `
<!-- L1..1
# title
-->

# タイトル

<!-- L3..3
paragraph.
-->

パラグラフ.

<!-- L5..6
- list
- item
-->

- リスト
- アイテム
`;
  const map = TranslationMap.parse(markdown);
  assertEquals(
    map.get("# title"),
    "# タイトル",
  );
  assertEquals(
    map.get("paragraph."),
    "パラグラフ.",
  );
  assertEquals(
    map.get("- list\n- item"),
    "- リスト\n- アイテム",
  );
});
