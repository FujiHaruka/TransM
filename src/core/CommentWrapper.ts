import { TextBlock } from "./interfaces.ts";

const PATTERN = /^<!-- L\d+\.\.\d+\n(.+)\n-->$/s;

export const CommentWrapper = {
  wrap(block: TextBlock): string {
    return `<!-- L${block.position.start.line}..${block.position.end.line}
${block.text}
-->`;
  },
  is(html: string) {
    return PATTERN.test(html);
  },
  unwrap(html: string): string {
    if (!this.is(html)) {
      throw new Error();
    }
    return PATTERN.exec(html)![1];
  },
};
