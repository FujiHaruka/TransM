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

export const readFile = async (file: string): Promise<string> => {
  const decoder = new TextDecoder("utf-8");
  const buf = await Deno.readFile(file);
  return decoder.decode(buf);
};

export const writeFile = async (file: string, data: string) => {
  const encoder = new TextEncoder();
  await Deno.writeFile(file, encoder.encode(data));
};
