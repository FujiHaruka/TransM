import { exists } from "https://deno.land/std/fs/exists.ts";
import { MarkdownBlock } from "./core/MarkdownBlock.ts";
import { TranslationText } from "./core/TranslationText.ts";

export const create = async (src: string, dest: string) => {
  const already = await exists(dest);
  if (already) {
    throw new Error(`File already exists: ${dest}`);
  }
  const buf = await Deno.readFile(src);
  const decoder = new TextDecoder("utf-8");
  const markdown = decoder.decode(buf);
  const block = MarkdownBlock.parse(markdown);
  const output = TranslationText.create(block.blocks()).toString();
  const encoder = new TextEncoder();
  await Deno.writeFile(dest, encoder.encode(output));
};

export const update = async (src: string, dest: string) => {
  {
    const already = await exists(src);
    if (!already) {
      throw new Error(`File doesn't exists: ${src}`);
    }
  }
  {
    const already = await exists(dest);
    if (!already) {
      throw new Error(`File doesn't exists: ${dest}`);
    }
  }
  const decoder = new TextDecoder("utf-8");
  const srcMarkdown = decoder.decode(await Deno.readFile(src))
  const destMarkdown = decoder.decode(await Deno.readFile(dest))
  const block = MarkdownBlock.parse(srcMarkdown)
  // TODO:
}
