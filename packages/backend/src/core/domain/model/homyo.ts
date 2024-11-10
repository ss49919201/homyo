import z from "zod";

export const homyoSchema = z
  .object({
    id: z.number().positive().int().min(1).brand("HomyoId"),
    name: z.string().min(1).max(255).brand("HomyoName"),
  })
  .readonly();

export type Homyo = z.infer<typeof homyoSchema>;

const newHomyo = ({ id, name }: { id: number; name: string }): Homyo => {
  const parsed = homyoSchema.safeParse({ id, name });
  if (!parsed.success) {
    throw parsed.error;
  }
  return parsed.data;
};

export const Homyo = {
  new: newHomyo,
};
