"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMails = getMails;
exports.createMail = createMail;
const database_1 = require("../database");
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getMails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield (0, database_1.connect)();
            const mails = yield conn.query("SELECT * FROM consulta_web");
            return res.json(mails[0]);
        }
        catch (error) {
            console.error("Error al obtener los registros:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    });
}
function createMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newMail = Object.assign(Object.assign({}, req.body), { estado: 1, tipo: 1, programacion: 0, idFranquicia: 7, idEntidad: null, fecha: new Date() });
            const conn = yield (0, database_1.connect)();
            yield conn.query("INSERT INTO consulta_web SET ?", [newMail]);
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            let htmlContent = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "views", "email.html"), "utf8");
            htmlContent = htmlContent
                .replace("{{nombre}}", newMail.nombre)
                .replace("{{apellido}}", newMail.apellido)
                .replace("{{consulta}}", newMail.consulta)
                .replace("{{destinatario}}", newMail.destinatario)
                .replace("{{telefono}}", newMail.telefono);
            const mailOptions = {
                from: "'ASME' <no.reply.enginzone@gmail.com>",
                to: newMail.destinatario,
                subject: newMail.tema,
                html: htmlContent,
            };
            yield transporter.sendMail(mailOptions);
            return res.json({
                success: true,
                message: "Correo enviado con éxito",
                status: 200,
            });
        }
        catch (error) {
            console.error("Error al crear el registro:", error);
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor.",
            });
        }
    });
}
