import { Resend } from "resend";

const PDF_URL =
	"https://www.northalabamadroneapplicators.com/downloads/North_Alabama_Drone_Applicators_Field_Guide_2026.pdf";

type SubmissionEmailPayload = {
	/** First word(s) for lead email greeting */
	firstName: string;
	/** Full name for admin notification */
	fullName: string;
	email: string;
	phone: string | null;
	county: string;
	cropTypes: string;
	acreageRange: string | null;
	primaryInterest: string;
	requestPdf: boolean;
	/** Combined notes stored on the lead (e.g. target pass + PDF flag). */
	notes: string | null;
};

function getEnv(name: string): string | null {
	return process.env[name]?.trim() || null;
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

export async function sendSubmissionEmails(payload: SubmissionEmailPayload) {
	const apiKey = getEnv("RESEND_API_KEY");
	const fromEmail = getEnv("RESEND_FROM_EMAIL");
	const adminEmail = getEnv("ADMIN_NOTIFICATION_EMAIL");

	if (!apiKey || !fromEmail || !adminEmail) {
		return;
	}

	const resend = new Resend(apiKey);

	const safeFirst = escapeHtml(payload.firstName);

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

	const leadSubject = payload.requestPdf
		? "Your North Alabama field guide is ready"
		: "We received your request — North Alabama Drone Applicators";

	const leadBodyPdf = `
      <p>Hi ${safeFirst},</p>
      <p>Thanks for your interest in drone spraying and spreading with North Alabama Drone Applicators.</p>
      <p>Here&apos;s what you asked us to send:</p>
      ${pdfBlock}
      <p>If you want a closer look at your fields after you read it, just reply to this email—we&apos;ll help you find the right next step.</p>
      <p>Thanks,<br/>North Alabama Drone Applicators</p>
    `;

	const leadBodyNoPdf = `
      <p>Hi ${safeFirst},</p>
      <p>Thanks for sharing your county, crop, acreage, and target pass with North Alabama Drone Applicators.</p>
      <p>We&apos;ll review what you sent and follow up with a practical read on drone spraying, ground rig spraying, crop dusting, or a combined approach when it fits your acres.</p>
      <p>If anything changes before we reply, just reply to this email.</p>
      <p>Thanks,<br/>North Alabama Drone Applicators</p>
    `;

	await resend.emails.send({
		from: fromEmail,
		to: payload.email,
		subject: leadSubject,
		html: payload.requestPdf ? leadBodyPdf : leadBodyNoPdf,
	});

	const phoneLine = payload.phone
		? `<li><strong>Phone:</strong> ${escapeHtml(payload.phone)}</li>`
		: "";
	const acreageLine = payload.acreageRange
		? `<li><strong>Acreage:</strong> ${escapeHtml(payload.acreageRange)}</li>`
		: "";
	const notesBlock = payload.notes
		? `<p><strong>Notes</strong></p><p style="white-space:pre-wrap;">${escapeHtml(payload.notes)}</p>`
		: "";

	await resend.emails.send({
		from: fromEmail,
		to: adminEmail,
		subject: "New website lead submission",
		html: `
      <p>A new lead was submitted.</p>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(payload.fullName)}</li>
        <li><strong>Email:</strong> ${escapeHtml(payload.email)}</li>
        ${phoneLine}
        <li><strong>County:</strong> ${escapeHtml(payload.county)}</li>
        <li><strong>Primary Crop(s):</strong> ${escapeHtml(payload.cropTypes)}</li>
        ${acreageLine}
        <li><strong>Primary Interest:</strong> ${escapeHtml(payload.primaryInterest)}</li>
        <li><strong>Field guide requested:</strong> ${payload.requestPdf ? "Yes" : "No"}</li>
      </ul>
      ${notesBlock}
    `,
	});
}

type ContactEmailPayload = {
	firstName: string;
	fullName: string;
	email: string;
	phone: string | null;
	county: string;
	message: string;
};

export async function sendContactEmails(payload: ContactEmailPayload) {
	const apiKey = getEnv("RESEND_API_KEY");
	const fromEmail = getEnv("RESEND_FROM_EMAIL");
	const adminEmail = getEnv("ADMIN_NOTIFICATION_EMAIL");

	if (!apiKey || !fromEmail || !adminEmail) {
		return;
	}

	const resend = new Resend(apiKey);
	const phoneLine = payload.phone
		? `<li><strong>Phone:</strong> ${escapeHtml(payload.phone)}</li>`
		: "";

	await resend.emails.send({
		from: fromEmail,
		to: adminEmail,
		subject: "New contact form submission",
		html: `
      <p>A new message was sent from the website contact form.</p>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(payload.fullName)}</li>
        <li><strong>Email:</strong> ${escapeHtml(payload.email)}</li>
        ${phoneLine}
        <li><strong>County:</strong> ${escapeHtml(payload.county)}</li>
      </ul>
      <p><strong>Message</strong></p>
      <p style="white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
    `,
	});

	await resend.emails.send({
		from: fromEmail,
		to: payload.email,
		subject: "We got your message — North Alabama Drone Applicators",
		html: `
      <p>Hi ${escapeHtml(payload.firstName)},</p>
      <p>Thanks for reaching out. We&apos;ve received your message and will get back to you as soon as we can — usually within one business day.</p>
      <p>If your question is urgent, you can also call us at <strong>256-566-8522</strong>.</p>
      <p>Thanks,<br/>North Alabama Drone Applicators</p>
    `,
	});
}
