type PositionPoint = {
  line: number;
  offset: number;
};

export type TextPosition = {
  start: PositionPoint;
  end: PositionPoint;
};

export type MarkdownNode = {
  type: string;
  value?: string; // has when type is "html"
  position: TextPosition;
};

export type MarkdownAst = {
  children: MarkdownNode[];
};

export type TextBlock = {
  position: TextPosition;
  text: string;
};
