import pkg from '@elasticemail/elasticemail-client';
import type { APIRoute } from 'astro';
const { EmailsApi } = pkg;

const apiKey = import.meta.env.ELASTIC_EMAIL_API_KEY;
const senderEmail = import.meta.env.ELASTIC_EMAIL_SENDER;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.subject || !data.phone) {
      return new Response(JSON.stringify({
        message: 'Missing required fields'
      }), { status: 400 });
    }

    // Prepare email content
    const emailContent = `
      New Contact Form Submission
      
      Name: ${data.name}
      Subject: ${data.subject}
      Phone: ${data.phone}
      Email: ${data.email || 'Not provided'}
      
      Message:
      ${data.message || 'No message provided'}
    `;

    // Initialize EmailsApi
    const emailsApi = new EmailsApi();
    emailsApi.authentications['apikey'].apiKey = apiKey;

    // Send email using Elastic Email
    await emailsApi.emailsPost({
      Recipients: [ { Email: 'info@promoniumng.com' } ],
      Content: {
        Body: [
          {
            ContentType: 'HTML',
            Content: emailContent.replace(/\n/g, '<br>')
          }
        ],
        Subject: `New Contact Form: ${data.subject}`,
        From: senderEmail
      }
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
