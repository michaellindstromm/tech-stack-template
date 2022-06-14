import { Router } from "https://deno.land/x/opine@2.2.0/mod.ts";
const router = Router();

const users = [
  { name: "Deno", email: "deno@denoland.com" },
  { name: "SuperDeno", email: "superdeno@denoland.com" },
  { name: "Deno the Dinosaur", email: "denosaur@denoland.com" },
];
// Home page route
router.get("/", function(_req, res) {
  res.set("cache-control", "no-store").render("index", {
    users,
    title: "Eta example",
    header: "Some users",
  });
});

// About test route
router.get("/test", function(_req, res) {
  res.render('test', {
    title: 'deno / opine / eta / test'
  })
});

export default router;