import { ModelId } from "./id";

const homyoBrand = Symbol("Homyo");

export type Homyo = {
  readonly id: ModelId & { brand: typeof homyoBrand };
  readonly name: string & { brand: typeof homyoBrand };
};

const newHomyo = (props: { id: ModelId; name: string }): Homyo => {
  return {
    id: props.id as Homyo["id"],
    name: props.name as Homyo["name"],
  };
};

export const Homyo = {
  new: newHomyo,
};

export const validateHomyoLength = (name: string): Error | null => {
  if (name.length !== 2) {
    return new Error("Homyo name must be 2 characters length");
  }
  return null;
};
