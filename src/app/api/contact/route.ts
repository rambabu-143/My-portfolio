const nodemailer = require('nodemailer');

import { NextResponse } from "next/server";

// Define the type for the request body
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, message }: ContactFormData = await req.json();

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service provider
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail account
        pass: process.env.EMAIL_PASS, // Your Gmail password or app password
      },
    });

    // Set up email data
    const mailOptions = {
      from: email,
      to: process.env.RECEIVER_EMAIL, // Your email address
      subject: `New message from ${name}`,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
