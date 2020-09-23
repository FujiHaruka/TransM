import { remark } from "../../deps.ts";
import { CommentWrapper } from "./CommentWrapper.ts";
import { MarkdownAst } from "./interfaces.ts";

export class TranslationMap {
  static parse(markdown: string): TranslationMap {
    const ast: MarkdownAst = remark.parse(markdown);
    const sliceOffsets: number[] = [];
    for (const { type, position: { start, end }, value } of ast.children) {
      if (type === "html" && CommentWrapper.is(value || "")) {
        sliceOffsets.push(start.offset);
        sliceOffsets.push(end.offset);
      }
    }
    const entries = sliceOffsets
      .map((offset, index) => {
        if (index % 2 === 0) {
          // html comment
          const offset2 = sliceOffsets[index + 1];
          const offset3 = sliceOffsets[index + 2] || undefined; // to the last
          const orig = markdown.slice(offset, offset2);
          const translated = markdown.slice(offset2, offset3);
          return [
            CommentWrapper.unwrap(orig),
            translated.trim(),
          ] as [string, string];
        } else {
          // markdown
          return null;
        }
      })
      .filter((entry): entry is [string, string] => Boolean(entry));

    const map = new Map<string, string>(entries);
    const header = markdown.slice(0, sliceOffsets[0]);
    return new TranslationMap(map, header);
  }

  private used = new Set<string>();

  private constructor(
    private readonly map: Map<string, string>,
    readonly header: string,
  ) {}

  get(origText: string): string | undefined {
    const translated = this.map.get(origText);
    if (translated !== undefined) {
      this.used.add(origText);
    }
    return translated;
  }

  usesAll(): boolean {
    return this.used.size === this.map.size;
  }
}
