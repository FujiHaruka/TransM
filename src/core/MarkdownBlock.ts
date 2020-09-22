import { remark } from "../../deps.ts";
import { MarkdownAst, TextPosition, TextBlock } from "./interfaces.ts";

export class MarkdownBlock {
  static parse(markdown: string): MarkdownBlock {
    const ast: MarkdownAst = remark.parse(markdown);
    const positions: TextPosition[] = ast.children
      .map(({
        position: { start, end },
      }) => ({
        start: {
          line: start.line,
          offset: start.offset,
        },
        end: {
          line: end.line,
          offset: end.offset,
        },
      }));
    return new MarkdownBlock(markdown, positions);
  }

  private constructor(
    readonly text: string,
    readonly positions: TextPosition[],
  ) {}

  blocks(): TextBlock[] {
    return this.positions
      .map((position) => ({
        position,
        text: this.text.slice(position.start.offset, position.end.offset), // Ignore the last line break charactors
      }));
  }
}
