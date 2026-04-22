import { Resend } from "resend";

const PDF_URL = "https://northalabamadroneapplicators.com/downloads/nada-spray-spread-overview.pdf";

type SubmissionEmailPayload = {
  firstName: string;
  email: string;
  county: string;
  cropTypes: string;
  primaryInterest: string;
  requestPdf: boolean;
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

  const pdfBlock = payload.requestPdf
    ? `
      <p><strong>Your Spray + Spread Overview (PDF)</strong></p>
      <p>
        <a href="${PDF_URL}" style="display:inline-block;padding:10px 16px;background:#1e3a0f;color:#f3d98a;text-decoration:none;border-radius:8px;font-weight:600;">
          Download the overview PDF
        </a>
      </p>
      <p style="font-size:14px;color:#444;">Benefits, preliminary cost per acre, and where we&apos;re headed—built for North Alabama growers.</p>
    `
    : "";

  await resend.emails.send({
    from: fromEmail,
    to: payload.email,
    subject: "You are on the North Alabama Drone Applicators list",
    html: `
      <p>Hi ${payload.firstName},</p>
      <p>Thanks for telling us you&apos;re interested in Fall 2026 drone spraying and spreading with North Alabama Drone Applicators.</p>
      <p>We received your submission and will reach out before the season with next steps.</p>
      ${pdfBlock}
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
        <li><strong>PDF requested:</strong> ${payload.requestPdf ? "Yes" : "No"}</li>
      </ul>
    `,
  });
}
