import { Router } from "express";

const router = Router();
import { IndexApp } from "../controllers/index.controller";

router.route("/api").get(IndexApp);
router.route("/api/welcome").get(IndexApp);

export default router;
