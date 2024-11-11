import * as crypto from "crypto";

export type ModelId = ReturnType<typeof crypto.randomUUID>;

export const newModelId = (): ModelId => {
  return crypto.randomUUID();
};
