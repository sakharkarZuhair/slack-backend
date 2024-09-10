import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World from ES Modules with Nodemon!");
});

export default router;
