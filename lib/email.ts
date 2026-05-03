import { Resend } from "resend";

const PDF_URL =
	"https://northalabamadroneapplicators.com/downloads/nada-spray-spread-overview.pdf";

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
      <p><strong>Where Drone Application Pays Off (North Alabama Field Guide)</strong></p>
      <p>
        <a href="${PDF_URL}" style="display:inline-block;padding:10px 16px;background:#1e3a0f;color:#f3d98a;text-decoration:none;border-radius:8px;font-weight:600;">
          Download the field guide (PDF)
        </a>
      </p>
      <p style="font-size:14px;color:#444;">When drone application saves time and yield on your acres—and when it doesn&apos;t. Built for Tennessee Valley field decisions.</p>
    `
		: "";

	await resend.emails.send({
		from: fromEmail,
		to: payload.email,
		subject: "Your North Alabama field guide is ready",
		html: `
      <p>Hi ${payload.firstName},</p>
      <p>Thanks for your interest in Fall 2026 drone spraying and spreading with North Alabama Drone Applicators.</p>
      <p>Here&apos;s what you asked us to send:</p>
      ${pdfBlock}
      <p>If you want a closer look at your fields after you read it, just reply to this email—we&apos;ll help you find the right next step.</p>
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
        <li><strong>Field guide requested:</strong> ${payload.requestPdf ? "Yes" : "No"}</li>
      </ul>
    `,
	});
}
