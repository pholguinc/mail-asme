import { Request, Response } from "express";
import { connect } from "../database";
import { MailInterface } from "../interfaces/mail.interface";
import nodemailer from "nodemailer";
import fs from  "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export async function getMails(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const conn = await connect();
    const mails = await conn.query("SELECT * FROM consulta_web");

    return res.json(mails[0]);
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}


export async function createMail(req: Request, res: Response) {
  try {
    const newMail: MailInterface = {
      ...req.body,
      estado: 1,
      tipo: 1,
      programacion: 0,
      idFranquicia: 7,
      idEntidad: null,
      fecha: new Date(),
    };
    const conn = await connect();
    await conn.query("INSERT INTO consulta_web SET ?", [newMail]);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let htmlContent = fs.readFileSync(
      path.join(__dirname, "..", "views", "email.html"),
      "utf8"
    );

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

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Correo enviado con éxito",
      status: 200,
    });
  } catch (error) {
    console.error("Error al crear el registro:", error);
    return res.status(500).json({
      success: false, 
      message: "Error interno del servidor.",
    });
  }
}





