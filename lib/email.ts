import { Resend } from "resend";

type SubmissionEmailPayload = {
  firstName: string;
  email: string;
  county: string;
  cropTypes: string;
  primaryInterest: string;
};

function getEnv(name: string): string | null {
  return process.env[name]?.trim() || null;
}

export async function sendSubmissionEmails(payload: SubmissionEmailPayload) {
  const apiKey = getEnv("RESEND_API_KEY");
  const fromEmail = getEnv("RESEND_FROM_EMAIL");
  const adminEmail = getEnv("ADMIN_NOTIFICATION_EMAIL");

  if (!apiKey || !fromEmail || !adminEmail) {
    return;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: fromEmail,
    to: payload.email,
    subject: "You are on the North Alabama Drone Applicators list",
    html: `
      <p>Hi ${payload.firstName},</p>
      <p>Thanks for reserving your spot with North Alabama Drone Applicators.</p>
      <p>We received your submission and will reach out before the Fall 2026 season with next steps.</p>
      <p>Thanks,<br/>North Alabama Drone Applicators</p>
    `,
  });

  await resend.emails.send({
    from: fromEmail,
    to: adminEmail,
    subject: "New website lead submission",
    html: `
      <p>A new lead was submitted.</p>
      <ul>
        <li><strong>Name:</strong> ${payload.firstName}</li>
        <li><strong>Email:</strong> ${payload.email}</li>
        <li><strong>County:</strong> ${payload.county}</li>
        <li><strong>Primary Crop(s):</strong> ${payload.cropTypes}</li>
        <li><strong>Primary Interest:</strong> ${payload.primaryInterest}</li>
      </ul>
    `,
  });
}
