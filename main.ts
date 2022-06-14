import { opine, serveStatic } from "https://deno.land/x/opine@2.2.0/mod.ts";
import { config } from "https://deno.land/std@0.143.0/dotenv/mod.ts";
import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts"
import { dirname, join } from "https://deno.land/std@0.143.0/path/mod.ts";

import router from "./src/router.ts";

await config({ safe: true })
const PORT = Deno.env.get("PORT") || '8000'
const ENV = Deno.env.get("ENV") || 'DEV'
const PRODUCTION = ENV === 'production'

const app = opine()
const __dirname = dirname(import.meta.url)

app.engine(".html", renderFile)
app.set("views", join(__dirname, "views"))
app.use(serveStatic(join(__dirname, "public")))
app.set("view engine", "html")
app.set("view cache", PRODUCTION);
app.use('/', router)

if (import.meta.main) {
  app.listen(parseInt(PORT));
  console.log(`Opine started on port ${PORT}`);
}

export { app };
