import { remark } from "../../deps.ts";
import { MarkdownAst, TextPosition, TextBlock } from "./interfaces.ts";

export class TranslationMap {
   static parse(markdown: string): TranslationMap {
     const ast: MarkdownAst = remark.parse(markdown);
     for (const node of ast.children) {
       const raw = markdown.slice(node.position.start.offset, node.position.end.offset)
       if (node.type === "html") {

       } else {

       }
     }
     console.log(ast)
     return new TranslationMap()
   }

   private constructor(

   ) {}
}
