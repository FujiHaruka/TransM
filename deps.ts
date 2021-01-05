import unified from "https://jspm.dev/unified@9.2.0";
import remarkParse from "https://jspm.dev/remark-parse@8.0.3";
export { default as Denomander } from "https://x.nest.land/denomander@0.7.0/mod.ts";
export { exists } from "https://deno.land/std@0.83.0/fs/exists.ts";
export { ensureFile } from "https://deno.land/std@0.83.0/fs/ensure_file.ts";

export const remark = (unified as any)().use(remarkParse);
