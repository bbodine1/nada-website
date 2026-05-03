import { type NextRequest, NextResponse } from "next/server";

import { sendContactEmails } from "@/lib/email";
import { upsertGhlContactInquiry } from "@/lib/ghl";
import { SERVICE_AREA_COUNTY_SET } from "@/lib/service-area-counties";
import { getSupabaseAdminClient } from "@/lib/supabase";

const ipRequestStore = new Map<string, number[]>();

type ContactPayload = {
	fullName?: unknown;
	email?: unknown;
	phone?: unknown;
	county?: unknown;
	message?: unknown;
	consent?: unknown;
	companyName?: unknown;
};

function asTrimmedString(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const oneMinuteAgo = now - 60_000;
	const history = (ipRequestStore.get(ip) ?? []).filter(
		(timestamp) => timestamp > oneMinuteAgo,
	);
	history.push(now);
	ipRequestStore.set(ip, history);
	return history.length > 5;
}

function validatePayload(body: ContactPayload) {
	const fullName = asTrimmedString(body.fullName);
	const email = asTrimmedString(body.email).toLowerCase();
	const phone = asTrimmedString(body.phone) || null;
	const county = asTrimmedString(body.county) || "Other";
	const message = asTrimmedString(body.message);
	const consent = body.consent === true;
	const companyName = asTrimmedString(body.companyName);

	if (companyName) {
		throw new Error("Spam submission rejected.");
	}
	if (!fullName || fullName.length < 2) {
		throw new Error("Please provide your full name (at least 2 characters).");
	}
	if (!isValidEmail(email)) {
		throw new Error("Please provide a valid email address.");
	}
	if (!SERVICE_AREA_COUNTY_SET.has(county)) {
		throw new Error("Please select a valid county in our service area.");
	}
	if (message.length < 10) {
		throw new Error("Please enter a message of at least 10 characters.");
	}
	if (message.length > 2000) {
		throw new Error("Message must be 2,000 characters or fewer.");
	}
	if (!consent) {
		throw new Error("Please confirm we may contact you about your inquiry.");
	}

	return {
		fullName,
		email,
		phone,
		county,
		message,
	};
}

export async function POST(request: NextRequest) {
	try {
		const ip =
			request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
			"unknown";
		if (isRateLimited(ip)) {
			return NextResponse.json(
				{ error: "Too many requests. Please wait a minute and try again." },
				{ status: 429 },
			);
		}

		const body = (await request.json()) as ContactPayload;
		const parsed = validatePayload(body);
		const supabase = getSupabaseAdminClient();

		const notesWithPhone = [parsed.message, parsed.phone ? `Phone: ${parsed.phone}` : null]
			.filter(Boolean)
			.join("\n\n");

		const { data: existingLead } = await supabase
			.from("interest_leads")
			.select("id")
			.eq("email", parsed.email)
			.order("submitted_at", { ascending: false })
			.limit(1)
			.maybeSingle();

		const leadPayload = {
			full_name: parsed.fullName,
			email: parsed.email,
			phone: parsed.phone,
			county: parsed.county,
			crop_types: null as string | null,
			acreage_range: null as string | null,
			preferred_contact_method: null as string | null,
			notes: notesWithPhone,
			consent: true,
			source: "website_contact",
			submitted_at: new Date().toISOString(),
		};

		let error: { message: string } | null = null;
		if (existingLead?.id) {
			const updateResult = await supabase
				.from("interest_leads")
				.update(leadPayload)
				.eq("id", existingLead.id);
			error = updateResult.error;
		} else {
			const insertResult = await supabase
				.from("interest_leads")
				.insert(leadPayload);
			error = insertResult.error;
		}

		if (error) {
			throw new Error(`Database insert failed: ${error.message}`);
		}

		await upsertGhlContactInquiry({
			fullName: parsed.fullName,
			email: parsed.email,
			phone: parsed.phone,
			county: parsed.county,
			message: parsed.message,
		});

		await sendContactEmails({
			firstName: parsed.fullName.split(" ")[0] || "there",
			fullName: parsed.fullName,
			email: parsed.email,
			phone: parsed.phone,
			county: parsed.county,
			message: parsed.message,
		});

		return NextResponse.json({ ok: true });
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: "Something went wrong while submitting the form.";
		return NextResponse.json({ error: message }, { status: 400 });
	}
}
