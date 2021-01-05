import unified from "https://jspm.dev/unified@9.2.0";
import remarkParse from "https://jspm.dev/remark-parse@8.0.3";
export { default as Denomander } from "https://x.nest.land/denomander@0.7.0/mod.ts";

export const remark = (unified as any)().use(remarkParse);
