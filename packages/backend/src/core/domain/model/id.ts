import * as crypto from "crypto";

export type ModelId = ReturnType<typeof crypto.randomUUID>;

export const newModelId = (): ModelId => {
  return crypto.randomUUID();
};

export const stringToModelId = (s: string): ModelId => {
  // FIXME: Validate the string is a valid UUID
  return s as ModelId;
};
