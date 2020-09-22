import { remark } from "./deps.ts";

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
  children: Node;
};

const filename = Deno.args[0];

const buf = await Deno.readFile(filename);
const decoder = new TextDecoder("utf-8");
const markdown = decoder.decode(buf);

const ast: Ast = remark.parse(markdown);

console.log(JSON.stringify(ast, null, 2));
