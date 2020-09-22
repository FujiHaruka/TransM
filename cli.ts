import { Denomander } from "./deps.ts";
import { create, update } from "./src/commands.ts";

const program = new Denomander({
  app_name: "mta",
  app_description: "???",
  app_version: "0.1.0",
});

type Args = {
  src: string;
  dest: string;
};

program
  .command("new [src] [dest]")
  .action(async ({ src, dest }: Args) => {
    try {
      await create(src, dest);
    } catch (e) {
      console.error(e);
      Deno.exit(1);
    }
  });

program
  .command("update [src] [dest]")
  .action(async ({ src, dest }: Args) => {
    try {
      await update(src, dest);
    } catch (e) {
      console.error(e);
      Deno.exit(1);
    }
  });

program.parse(Deno.args);
