import z from "zod";

export const homyoSchema = z
  .object({
    id: z.number().brand("HomyoId"),
    name: z.string(),
  })
  .readonly();

export type Homyo = z.infer<typeof homyoSchema>;

export const newHomyo = ({ id, name }: { id: number; name: string }): Homyo => {
  return homyoSchema.parse({ id, name });
};
