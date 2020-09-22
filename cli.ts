import { Denomander } from "./deps.ts";
import { create } from "./src/commands.ts";

const program = new Denomander({
  app_name: "mta",
  app_description: "???",
  app_version: "0.1.0",
});

program
  .command("new [src] [dest]")
  .action(async ({ src, dest }: { src: string; dest: string }) => {
    try {
      await create(src, dest);
    } catch (e) {
      console.error(e);
      Deno.exit(1);
    }
  });

program.parse(Deno.args);
