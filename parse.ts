import { parse } from "https://jspm.dev/@textlint/markdown-to-ast@6.2.5"

const decoder = new TextDecoder("utf-8");
const filename = Deno.args[0];
const markdown = decoder.decode(await Deno.readFile(filename));
const markup = parse(markdown);
console.log(markup);
