import { Router } from "../deps.ts";
import {
  basename,
  dirname,
  resolve,
  join,
} from "../deps.ts";

const router = Router();

function tryStat(path: string) {
  try {
    return Deno.statSync(path);
  } catch (e) {
    return undefined;
  }
}

const presolve = (dir: string, file: string): string | undefined => {
  let path = join(dir, file);
  console.log('presolve path: ', path)
  let stat = tryStat(path);
  console.log('presolve stat: ', stat)

  if (stat && stat.isFile) {
    return path;
  }

  // <path>/index.<ext>
  const ext = '.eta';
  path = join(dir, basename(file, ext), `index${ext}`);
  console.log('presolve no stat path: ', path)
  stat = tryStat(path);
  console.log('presolve try again stat: ', stat)

  if (stat && stat.isFile) {
    return path;
  }
}

// GET home page.
router.get("/", (req, res, _next) => {
  console.log('app: ', req.app)
  console.log('View: ', req.app.get('view'))
  const View = req.app.get("view");
  const root = req.app.get("views")
  const view = new View('index.eta', {
    defaultEngine: req.app.get("view engine"),
    engines: req.app.engines,
    root,
  });
  console.log('view: ', view)
  const loc = resolve(root, 'index.eta');
  console.log('loc: ', loc)
  const dir = dirname(loc);
  console.log('dir: ', dir)
  const file = basename(loc);
  console.log('file: ', file)
  const path = presolve(dir, file);
  console.log('path: ', path)
  res.render("index.eta", {
    title: "Opine",
  });
});

export default router;
