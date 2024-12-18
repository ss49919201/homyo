import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { newCreateHomyoUsecase } from "../../core/usecase/createHomyo";
import { NotFoundError } from "../../core/usecase/error";
import { newGetHomyoUsecase } from "../../core/usecase/getHomyo";
import { newHomyoRepository } from "../../infrastructure/repository/homyo";

const PORT = 30000;

const app = new Hono();

app.get("/health", (c) => {
  return c.text("ok");
});

// routing for `/homyos`
{
  const homyo = new Hono().basePath("/homyos");

  homyo.post(
    "/",
    zValidator("json", z.object({ name: z.string() })),
    async (c) => {
      const { name } = c.req.valid("json");
      await newCreateHomyoUsecase(newHomyoRepository().save).exec({ name });
      return c.json({ message: "created" }, 201);
    }
  );

  homyo.get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");
      try {
        const homyo = await newGetHomyoUsecase(
          newHomyoRepository().loadById
        ).exec({
          id,
        });
        return c.json(homyo);
      } catch (e: unknown) {
        // FIXME: middleware ...
        if (e instanceof NotFoundError) {
          return c.json({ message: e.message }, 404);
        }
        throw e;
      }
    }
  );

  app.route("/", homyo);
}

console.log(`Server is running on port ${PORT}`);
serve({
  fetch: app.fetch,
  port: PORT,
});
