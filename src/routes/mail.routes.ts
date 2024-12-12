import { Router } from "express";
import { createMail, getMails } from "../controllers/mail.controller";
const router = Router();


router.route("/").get(getMails).post(createMail);


export default router;
