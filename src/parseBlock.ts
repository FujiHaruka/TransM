import { remark } from "../deps.ts";

type PositionAt = {
  line: number;
  column: number;
  offset: number;
};

type Node = {
  type: string;
  position: {
    start: PositionAt;
    end: PositionAt;
  };
};

type Ast = {
  children: Node[];
};

export type Block = {
  start: number;
  end: number;
};

export const parseBlock = (markdown: string): Block[] => {
  const ast: Ast = remark.parse(markdown);
  const blocks: Block[] = ast.children
    .map((node) => ({
      start: node.position.start.line,
      end: node.position.end.line,
    }));
  return blocks;
};
