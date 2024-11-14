import { Homyo } from "../../core/domain/model/homyo";
import { ModelId } from "../../core/domain/model/id";
import { HomyoRepository } from "../../core/domain/repository/homyo";

const homyos = new Map<ModelId, Homyo>();

const save = async (homyo: Homyo): Promise<void> => {
  homyos.set(homyo.id, homyo);

  console.log(`saved: ${homyo.id}`);
};

const loadById = async (id: ModelId): Promise<Homyo | null> => {
  return homyos.get(id) ?? null;
};

export const newHomyoRepository = (): HomyoRepository => {
  return {
    save,
    loadById,
  };
};
