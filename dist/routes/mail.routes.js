"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mail_controller_1 = require("../controllers/mail.controller");
const router = (0, express_1.Router)();
router.route("/").get(mail_controller_1.getMails).post(mail_controller_1.createMail);
exports.default = router;
