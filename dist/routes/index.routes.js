"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_controller_1 = require("../controllers/index.controller");
router.route("/api").get(index_controller_1.IndexApp);
router.route("/api/welcome").get(index_controller_1.IndexApp);
exports.default = router;
