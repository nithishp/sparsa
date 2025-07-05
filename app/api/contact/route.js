//TODO: API not working, need to fix it

import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  // Retrieve environment variables
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;
  console.log("Username:", username);
  console.log("My Email:", myEmail);
  console.log("Password:", password ? "********" : "Not set");

  try {
    // Parse the incoming request body as JSON
    const body = await request.json();
    console.log("[Contact API] Received body:", body);
    const { name, number, mail, companyName, message } = body;

    // Validate required fields
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!mail) missingFields.push("mail");
    if (!message) missingFields.push("message");
    if (missingFields.length > 0) {
      console.warn(
        `[Contact API] Missing required fields: ${missingFields.join(", ")}`
      );
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // For port 465, secure must be true
      auth: {
        user: username,
        pass: password,
      },
    });

    // Verify transporter connection before sending
    try {
      await transporter.verify();
      console.log("[Contact API] SMTP connection verified.");
    } catch (smtpError) {
      console.error("[Contact API] SMTP connection failed:", smtpError);
      return NextResponse.json(
        { message: "SMTP connection failed", error: smtpError.message },
        { status: 502 }
      );
    }

    // Send the email
    try {
      await transporter.sendMail({
        from: username,
        to: myEmail,
        subject: `New response from Sparsa`,
        html: `
          <h1>Sparsa Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${mail}</p>
          <p><strong>Phone Number:</strong> ${number || "Not provided"}</p>
          <p><strong>Company Name:</strong> ${companyName || "Not provided"}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
      console.log(
        `[Contact API] Email sent successfully to ${myEmail} from ${username}`
      );
    } catch (mailError) {
      console.error("[Contact API] Error sending email:", mailError);
      return NextResponse.json(
        { message: "Could not send message", error: mailError.message },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "Success: email was sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return NextResponse.json(
      { message: "Unexpected server error", error: error.message },
      { status: 500 }
    );
  }
}
