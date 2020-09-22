import { exists } from "https://deno.land/std/fs/exists.ts";
import { ExpectedError } from "./Error.ts";

export const assertExist = async (file: string) => {
  const ok = await exists(file);
  if (!ok) {
    throw new ExpectedError(`File doesn't exist: ${file}`);
  }
};

export const assertNotExist = async (file: string) => {
  const ok = await exists(file);
  if (ok) {
    throw new ExpectedError(`File already exists: ${file}`);
  }
};
