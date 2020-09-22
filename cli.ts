import { create } from "./src/commands.ts";

const [src, dest] = Deno.args;

if (!dest) {
  console.error("Usage: ...");
  Deno.exit(1);
}

const handleError = async (promise: Promise<void>) => {
  try {
    await promise;
  } catch (e) {
    console.error(e);
    Deno.exit(1);
  }
};

handleError(create(src, dest));
