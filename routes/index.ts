import { Router } from "../deps.ts";

const router = Router();

// GET home page.
router.get("/", (req, res, _next) => {
  console.log('app: ', req.app)
  console.log('View: ', req.app.get('view'))
  const View = req.app.get("view");
  const view = new View('index', {
    defaultEngine: req.app.get("view engine"),
    engines: req.app.engines,
    root: req.app.get("views"),
  });
  console.log('view: ', view)
  res.render("index", {
    title: "Opine",
  });
});

export default router;
