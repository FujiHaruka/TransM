import { Denomander } from "./deps.ts";
import { create, update } from "./src/commands.ts";
import { ExpectedError } from "./src/util/Error.ts";

const program = new Denomander({
  app_name: "transm",
  app_description: "Translation assistant tool for Markdown document",
  app_version: "1.0.0",
});

type Args = {
  src: string;
  dest: string;
};

program
  .command("new [src] [dest]")
  .description("Create a translation markdown file.")
  .action(async ({ src, dest }: Args) => {
    try {
      await create(src, dest);
      console.log(`Created: ${dest}`);
    } catch (e) {
      if (e instanceof ExpectedError) {
        console.error(`[ERROR]`, e.message);
      } else {
        console.error(e);
      }
      Deno.exit(1);
    }
  });

program
  .command("update [src] [dest]")
  .description("Update a translation markdown file.")
  .action(async ({ src, dest }: Args) => {
    try {
      const updated = await update(src, dest);
      if (updated) {
        console.log(`Updated: ${dest}`);
      } else {
        console.log(`Up to date: ${dest}`);
      }
    } catch (e) {
      if (e instanceof ExpectedError) {
        console.error(`[ERROR]`, e.message);
      } else {
        console.error(e);
      }
      Deno.exit(1);
    }
  });

program.parse(Deno.args);
