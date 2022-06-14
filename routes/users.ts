import { Router } from "../deps.ts";

const router = Router();

// GET users listing.
router.get("/", (req, res, _next) => {
  console.log('app: ', req.app)
  res.send("Users are coming shortly!");
});

export default router;
