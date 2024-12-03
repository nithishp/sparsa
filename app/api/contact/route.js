import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  // Retrieve environment variables
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  try {
    // Parse the incoming request body as JSON
    const body = await request.json();
    const { name, number, mail, companyName, message } = body;

    // Validate required fields
    if (!name || !mail || !message) {
      return NextResponse.json(
        { message: "Missing required fields: name, mail, or message" },
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,

  auth: {
    user: username,
    pass: password,
  },
});

    // Send the email
    await transporter.sendMail({
      from: username,
      to: myEmail,
      subject: `Website activity from ${mail}`,
      html: `
        <h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${mail}</p>
        <p><strong>Phone Number:</strong> ${number || "Not provided"}</p>
        <p><strong>Company Name:</strong> ${companyName || "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Return success response
    return NextResponse.json(
      { message: "Success: email was sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Could not send message", error: error.message },
      { status: 500 }
    );
  }
}


