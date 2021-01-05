import { MarkdownBlock } from "./core/MarkdownBlock.ts";
import { TranslationMap } from "./core/TranslationMap.ts";
import { TranslationText } from "./core/TranslationText.ts";
import {
  assertFileExist,
  assertFileNotExist,
  readFile,
  writeFile,
} from "./util/fs.ts";

/**
 * Creat a translation markdown file.
 * @param src - source file path
 * @param dest - destination file path
 */
export const create = async (src: string, dest: string) => {
  await assertFileExist(src);
  await assertFileNotExist(dest);
  const markdown = await readFile(src);
  const block = MarkdownBlock.parse(markdown);
  const output = TranslationText.create(block.blocks()).toString();
  await writeFile(dest, output);
};

/**
 * Update a translation markdown file.
 * @param src - source file path
 * @param dest - destination file path
 */
export const update = async (src: string, dest: string): Promise<boolean> => {
  await assertFileExist(src);
  await assertFileNotExist(dest);
  const srcMd = await readFile(src);
  const destMd = await readFile(dest);
  const block = MarkdownBlock.parse(srcMd);
  const translationMap = TranslationMap.parse(destMd);
  const translation = TranslationText.merge(block.blocks(), translationMap);
  const output = translation.toString();
  if (translation.upToDate()) {
    return false;
  }
  await writeFile(dest, output);
  return true;
};
