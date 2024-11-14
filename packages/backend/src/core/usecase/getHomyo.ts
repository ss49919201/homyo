import { z } from "zod";
import { Homyo } from "../domain/model/homyo";
import { stringToModelId } from "../domain/model/id";
import { HomyoRepository } from "../domain/repository/homyo";
import { NotFoundError } from "./error";

const propsScehma = z
  .object({
    id: z.string(),
  })
  .readonly();

const payloadSchema = z
  .object({
    id: z.string(),
    name: z.string(),
  })
  .readonly();

type Props = z.infer<typeof propsScehma>;

type Payload = z.infer<typeof payloadSchema>;

export const newGetHomyoUsecase = (
  loadHomyoById: HomyoRepository["loadById"]
) => ({
  exec: async (props: Props): Promise<Payload> => {
    const homyo = await loadHomyoById(
      Homyo.modelIdToHomoyId(stringToModelId(props.id))
    );
    if (!homyo) {
      throw new NotFoundError("Homyo not found");
    }
    return payloadSchema.parse({
      id: homyo.id,
      name: homyo.name,
    });
  },
});
