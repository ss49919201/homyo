import { D1Database } from "@cloudflare/workers-types";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import { Homyo } from "../../core/domain/model/homyo";

const saveMany = (prisma: PrismaClient) => {
  return async (homyos: Homyo[]): Promise<void> => {
    await prisma.homyo.createMany({
      data: homyos.map((homyo) => ({
        id: homyo.id,
        name: homyo.name,
      })),
    });
  };
};

export const newHomyoDao = (d1Database: D1Database) => {
  const prisma = new PrismaClient({
    adapter: new PrismaD1(d1Database),
    log: ["query"],
  });
  return {
    saveMany: saveMany(prisma),
  };
};
