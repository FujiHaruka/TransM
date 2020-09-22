import unified from "https://jspm.dev/unified@9.2.0";
import remarkParse from "https://jspm.dev/remark-parse@8.0.3";

export const remark = unified().use(remarkParse);
