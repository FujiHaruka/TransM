import { ensureFile, exists } from "../../deps.ts";
import { ExpectedError } from "./Error.ts";

export const assertFileExist = async (file: string) => {
  try {
    await ensureFile(file);
  } catch (e) {
    throw new ExpectedError(e.message + `: ${file}`);
  }
};

export const assertFileNotExist = async (file: string) => {
  const ok = await exists(file);
  if (ok) {
    throw new ExpectedError(`A file or directory already exists: ${file}`);
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
