import { z } from "zod";
import { Homyo } from "../domain/model/homyo";
import { newModelId } from "../domain/model/id";
import { HomyoRepository } from "../domain/repository/homyo";

const createHomyoPropsSchema = z
  .object({
    name: z.string(),
  })
  .readonly();

type CreateHomyoProps = z.infer<typeof createHomyoPropsSchema>;

export const newCreateHomyoUsecase = (saveHomyo: HomyoRepository["save"]) => {
  exec: async (props: CreateHomyoProps): Promise<void> => {
    const homyo = Homyo.new({
      id: newModelId(),
      name: props.name,
    });

    await saveHomyo(homyo).catch((err: unknown) => {
      throw new Error(
        "Failed to save homyo: " +
          (err instanceof Error ? err.message : JSON.stringify(err))
      );
    });
  };
};
