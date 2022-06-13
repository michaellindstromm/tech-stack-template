import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Hello World from router!";
});

export default router;