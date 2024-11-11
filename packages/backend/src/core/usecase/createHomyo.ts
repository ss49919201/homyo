import { z } from "zod";
import { Homyo, HomyoModelError } from "../domain/model/homyo";
import { newModelId } from "../domain/model/id";
import { HomyoRepository } from "../domain/repository/homyo";

const createHomyoPropsSchema = z
  .object({
    name: z.string(),
  })
  .readonly();

type CreateHomyoProps = z.infer<typeof createHomyoPropsSchema>;

const errMessageFromModelError = (error: HomyoModelError): string => {
  switch (error.type) {
    case "InvalidHomyoNameError":
      return "Invalid homyo name";
    case "InvalidHomyoIdError":
      return "Invalid homyo id";
  }
};

export const newCreateHomyoUsecase = (saveHomyo: HomyoRepository["save"]) => {
  exec: async (props: CreateHomyoProps): Promise<void> => {
    const homyo = (() => {
      try {
        return Homyo.new({ id: newModelId(), name: props.name });
      } catch (err) {
        throw new Error(errMessageFromModelError(err));
      }
    })();

    await saveHomyo(homyo).catch((err: unknown) => {
      throw new Error(
        "Failed to save homyo: " +
          (err instanceof Error ? err.message : JSON.stringify(err))
      );
    });
  };
};
