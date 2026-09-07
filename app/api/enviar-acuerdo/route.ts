import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { destinatario, asunto, mensaje, pdfBase64, nombreArchivo, remitenteNombre, remitenteEmail } = await request.json();

    if (!destinatario || !pdfBase64) {
      return NextResponse.json({ error: "Faltan datos para el envío" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Tu máscara oficial
    const correoMascara = "ar_carrefourmedia@carrefour.com"; 

    // PARACAÍDAS: Si remitenteNombre llega vacío, usamos 'Equipo Comercial'
    const nombreSeguro = remitenteNombre ? remitenteNombre : 'Equipo Comercial';
    const emailSeguro = remitenteEmail ? remitenteEmail : correoMascara;

    const mailOptions = {
      from: `"${nombreSeguro} | Carrefour Media" <${correoMascara}>`,
      to: destinatario,
      cc: "laureano_chimento@carrefour.com", 
      replyTo: emailSeguro, 
      subject: asunto,
      text: mensaje,
      attachments: [
        {
          filename: nombreArchivo,
          path: pdfBase64 
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Correo enviado con éxito" });

  } catch (error: any) {
    console.error("Error al enviar email:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}