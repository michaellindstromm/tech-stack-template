import { opine, serveStatic } from "https://deno.land/x/opine@2.2.0/mod.ts";
import { config } from "https://deno.land/std@0.143.0/dotenv/mod.ts";
import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts"
import router from "./lib/router.ts";

await config({ safe: true })
const PORT = Deno.env.get("PORT") || '8000'
const ENV = Deno.env.get("ENV") || 'DEV'
const PRODUCTION = ENV === 'production'

const app = opine()
app.engine(".html", renderFile);
const viewsPath = `${Deno.cwd()}/views`
console.log('viewsPath: ', viewsPath)
const fileNames: string[] = [];
  
for await (const dirEntry of Deno.readDir(`${Deno.cwd()}/views`)) {
  if (dirEntry.isFile) {
    fileNames.push(dirEntry.name);
  }
}

console.log(fileNames);
app.set("views", viewsPath);
app.use(serveStatic(`${Deno.cwd()}/views`));
app.set("view engine", "html")
app.set("view cache", PRODUCTION);
app.use('/', router)

if (import.meta.main) {
  app.listen(parseInt(PORT));
  console.log(`Opine started on port ${PORT}`);
}

export { app };
