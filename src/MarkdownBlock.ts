import { remark } from "../deps.ts";

type PositionPoint = {
  line: number;
  offset: number;
};

type Position = {
  start: PositionPoint;
  end: PositionPoint;
}

type Node = {
  type: string;
  position: Position;
};

type Ast = {
  children: Node[];
};

export type Block = {
  position: Position
  text: string
}

export class MarkdownBlock {
  static parse(markdown: string): MarkdownBlock {
    const ast: Ast = remark.parse(markdown);
    const positions: Position[] = ast.children
      .map(({
        position: { start, end }
      }) => ({
        start: {
          line: start.line,
          offset: start.offset
        },
        end: {
          line: end.line,
          offset: end.offset,
        },
      }));
    return new MarkdownBlock(markdown, positions)
  }

  private constructor(readonly text: string, readonly positions: Position[]) {}

  blocks(): Block[] {
    return this.positions
      .map((position) => ({
        position,
        text: this.text.slice(position.start.offset, position.end.offset) // Ignore the last line break charactors
      }))
  }
}
