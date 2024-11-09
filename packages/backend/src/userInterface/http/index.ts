import { serve } from "@hono/node-server";
import { Hono } from "hono";

const PORT = 30000;

const app = new Hono();

app.get("/health", (c) => {
  return c.text("ok");
});

console.log(`Server is running on port ${PORT}`);
serve({
  fetch: app.fetch,
  port: PORT,
});
