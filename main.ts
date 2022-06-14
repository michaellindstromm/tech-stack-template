import { opine, serveStatic } from "https://deno.land/x/opine@2.2.0/mod.ts"
import { config } from "https://deno.land/std@0.143.0/dotenv/mod.ts"
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts"
import router from "./lib/router.ts"

await config({ safe: true })
const PORT = Deno.env.get("PORT") || '8000'
const ENV = Deno.env.get("ENV") || 'DEV'
const PRODUCTION = ENV === 'production'
const VIEWS_DIR = `${Deno.cwd()}/views`

configure({
  views: VIEWS_DIR
})

const app = opine()
app.engine(".html", renderFile)
//app.set("views", `${Deno.cwd()}/views`)
app.use(serveStatic(`${Deno.cwd()}/public`))
app.set("view engine", "html")
app.set("view cache", PRODUCTION)
app.use('/', router)

if (import.meta.main) {
  try {
    app.listen(parseInt(PORT))
  } catch (error) {
    console.error(`FATAL. FAILED TO START SERVER. ${error}`)
  }
}

export { app }
