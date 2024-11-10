import { Homyo } from "../model/homyo";

export interface HomyoRepository {
  save(homyo: Homyo): Promise<void>;
  loadById(id: Homyo["id"]): Promise<Homyo | null>;
}
