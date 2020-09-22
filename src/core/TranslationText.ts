import { TextBlock } from "./interfaces.ts";

const originalTextComment = (block: TextBlock): string => {
  return `<!-- L${block.position.start.line}..${block.position.end.line}
${block.text}
-->
`;
};

export class TranslationText {
  static create(blocks: TextBlock[]) {
    return new TranslationText(blocks);
  }

  private constructor(
    private readonly blocks: TextBlock[],
    // private readonly textMap?: Map<string, string> // 一度しか値を使えない Map にしたい
  ) {}

  toString(): string {
    return this.blocks
      .flatMap((block) => [
        originalTextComment(block),
        block.text + "\n",
      ])
      .join("\n");
  }
}
