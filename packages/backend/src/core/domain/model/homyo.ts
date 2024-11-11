import z from "zod";
import { ModelId } from "./id";

const homyoSchema = z
  .object({
    id: z.custom<ModelId>().brand("HomyoId"),
    name: z.string().min(1).max(255).brand("HomyoName"),
  })
  .readonly();

export type Homyo = z.infer<typeof homyoSchema>;

export type HomyoErrorType = "InvalidHomyoIdError" | "InvalidHomyoNameError";

export class InvalidHomyoIdError extends Error {
  type: HomyoErrorType = "InvalidHomyoIdError";
  constructor() {
    super("Invalid homyo id");
  }
}

export class InvalidHomyoNameError extends Error {
  type: HomyoErrorType = "InvalidHomyoNameError";
  constructor() {
    super("Invalid homyo name");
  }
}

export type HomyoModelError = InvalidHomyoIdError | InvalidHomyoNameError;

const propToErrConstructorMap: Record<keyof Homyo, () => HomyoModelError> = {
  id: () => new InvalidHomyoIdError(),
  name: () => new InvalidHomyoNameError(),
} as const;

const newHomyo = (props: { id: ModelId; name: string }): Homyo => {
  const parsed = homyoSchema.safeParse(props);
  if (!parsed.success) {
    Object.entries(propToErrConstructorMap).forEach(([path, newError]) => {
      if (
        parsed.error.issues.some((issue) =>
          issue.path.some((issuePath) => issuePath === path)
        )
      ) {
        throw newError();
      }
    });
    throw new Error("Invalid homyo props");
  }
  return parsed.data;
};

export const Homyo = {
  new: newHomyo,
};
