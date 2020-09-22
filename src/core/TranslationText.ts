import { TextBlock } from "./interfaces.ts";
import { CommentWrapper } from "./CommentWrapper.ts";
import { TranslationMap } from "./TranslationMap.ts";

export class TranslationText {
  static create(blocks: TextBlock[]) {
    return new TranslationText(blocks);
  }

  static merge(blocks: TextBlock[], map: TranslationMap) {
    return new TranslationText(blocks, map);
  }

  private constructor(
    private readonly blocks: TextBlock[],
    private readonly translationMap?: TranslationMap,
  ) {}

  toString(): string {
    return (this.translationMap?.header || "") + this.blocks
      .flatMap((block) => [
        CommentWrapper.wrap(block) + "\n",
        (this.translationMap?.get(block.text) || block.text) + "\n",
      ])
      .join("\n");
  }

  upToDate(): boolean {
    // must be called after toString()
    return this.translationMap?.usesAll() || false;
  }
}
