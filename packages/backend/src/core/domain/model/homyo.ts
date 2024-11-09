import z from "zod";

export const homyoSchema = z
  .object({
    id: z.number().positive().int().min(1).brand("HomyoId"),
    name: z.string().min(1).max(255),
  })
  .readonly();

export type Homyo = z.infer<typeof homyoSchema>;

export const newHomyo = ({ id, name }: { id: number; name: string }): Homyo => {
  return homyoSchema.parse({ id, name });
};
