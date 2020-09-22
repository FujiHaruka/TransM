import { MarkdownBlock } from "./core/MarkdownBlock.ts";
import { TranslationMap } from "./core/TranslationMap.ts";
import { TranslationText } from "./core/TranslationText.ts";
import { assertExist, assertNotExist } from "./util/fs.ts";

/**
 * Creat a translation markdown file.
 * @param src - source file path
 * @param dest - destination file path
 */
export const create = async (src: string, dest: string) => {
  await assertExist(src);
  await assertNotExist(dest);
  const buf = await Deno.readFile(src);
  const decoder = new TextDecoder("utf-8");
  const markdown = decoder.decode(buf);
  const block = MarkdownBlock.parse(markdown);
  const output = TranslationText.create(block.blocks()).toString();
  const encoder = new TextEncoder();
  await Deno.writeFile(dest, encoder.encode(output));
};

/**
 * Update a translation markdown file.
 * @param src - source file path
 * @param dest - destination file path
 */
export const update = async (src: string, dest: string): Promise<boolean> => {
  await assertExist(src);
  await assertExist(dest);
  const decoder = new TextDecoder("utf-8");
  const srcMarkdown = decoder.decode(await Deno.readFile(src));
  const destMarkdown = decoder.decode(await Deno.readFile(dest));
  const block = MarkdownBlock.parse(srcMarkdown);
  const translationMap = TranslationMap.parse(destMarkdown);
  const translation = TranslationText.merge(block.blocks(), translationMap);
  const output = translation
    .toString();
  if (translation.upToDate()) {
    return false;
  }
  const encoder = new TextEncoder();
  await Deno.writeFile(dest, encoder.encode(output));
  return true;
};
