import { TextBlock } from "./interfaces.ts";
import { CommentWrapper } from "./CommentWrapper.ts"

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
        CommentWrapper.wrap(block) + "\n",
        block.text + "\n",
      ])
      .join("\n");
  }
}
