import { Application, send } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import * as log from "https://deno.land/std@0.143.0/log/mod.ts";
import { config } from "https://deno.land/std@0.143.0/dotenv/mod.ts";
import router from "./src/router.ts";

await config({ safe: true })

const app = new Application();
const PORT = Deno.env.get("PORT") || '8000'

app.addEventListener("error", (event) => {
  log.error(event.error);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.response.body = "Internal server error";
    throw error;
  }
});

app.use(router.routes());

app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname;
  const fileWhitelist = ["/index.html"];

  if (fileWhitelist.includes(filePath)) {
    await send(ctx, filePath, {
      root: `${Deno.cwd()}/public`,
    });
  }
});

if (import.meta.main) {
  log.info(`Starting server on port ${PORT}...`);
  await app.listen({
    port: parseInt(PORT) || 8000,
  });
}
