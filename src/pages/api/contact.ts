import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

// Create transporter with Zoho Mail credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: 'tekfolio@promoniumng.com', // Admin account
    pass: import.meta.env.ZOHO_EMAIL_PASSWORD
  }
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.subject || !data.phone) {
      return new Response(JSON.stringify({
        message: 'Missing required fields'
      }), { status: 400 });
    }

    // Prepare email content with HTML formatting
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
      
      <h3>Message:</h3>
      <p>${data.message || 'No message provided'}</p>
    `;

    // Send email using Nodemailer
    await transporter.sendMail({
      from: 'tekfolio@promoniumng.com', // Sending from admin account
      to: 'info@promoniumng.com',       // Sending to info account
      subject: `New Contact Form: ${data.subject}`,
      html: emailContent,
      replyTo: data.email || 'info@promoniumng.com' // Set reply-to to the customer's email if provided
    });

    return new Response(JSON.stringify({
      message: 'Message sent successfully!'
    }), { status: 200 });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(JSON.stringify({
      message: 'Error sending message. Please try again.'
    }), { status: 500 });
  }
};