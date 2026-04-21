import { NextRequest, NextResponse } from "next/server";

import { upsertGhlContact } from "@/lib/ghl";
import { getSupabaseAdminClient } from "@/lib/supabase";

const allowedCounties = new Set([
  "Madison",
  "Limestone",
  "Morgan",
  "Cullman",
  "Lawrence",
]);

const ipRequestStore = new Map<string, number[]>();

type LeadPayload = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  county?: unknown;
  cropTypes?: unknown;
  acreageRange?: unknown;
  preferredContactMethod?: unknown;
  notes?: unknown;
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
  const history = (ipRequestStore.get(ip) ?? []).filter((timestamp) => timestamp > oneMinuteAgo);
  history.push(now);
  ipRequestStore.set(ip, history);
  return history.length > 5;
}

function validatePayload(body: LeadPayload) {
  const fullName = asTrimmedString(body.fullName);
  const email = asTrimmedString(body.email).toLowerCase();
  const phone = asTrimmedString(body.phone) || null;
  const county = asTrimmedString(body.county);
  const cropTypes = asTrimmedString(body.cropTypes);
  const acreageRange = asTrimmedString(body.acreageRange) || null;
  const preferredContactMethod = asTrimmedString(body.preferredContactMethod) || null;
  const notes = asTrimmedString(body.notes) || null;
  const consent = body.consent === true;
  const companyName = asTrimmedString(body.companyName);

  if (companyName) {
    throw new Error("Spam submission rejected.");
  }
  if (!fullName || fullName.length < 2) {
    throw new Error("Please provide your full name.");
  }
  if (!isValidEmail(email)) {
    throw new Error("Please provide a valid email address.");
  }
  if (!allowedCounties.has(county)) {
    throw new Error("Please select a valid county in our service area.");
  }
  if (!cropTypes) {
    throw new Error("Please provide at least one crop type.");
  }
  if (!consent) {
    throw new Error("Consent is required to submit this form.");
  }

  return {
    fullName,
    email,
    phone,
    county,
    cropTypes,
    acreageRange,
    preferredContactMethod,
    notes,
    consent,
  };
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as LeadPayload;
    const parsed = validatePayload(body);
    const supabase = getSupabaseAdminClient();

    const { error } = await supabase.from("interest_leads").insert({
      full_name: parsed.fullName,
      email: parsed.email,
      phone: parsed.phone,
      county: parsed.county,
      crop_types: parsed.cropTypes,
      acreage_range: parsed.acreageRange,
      preferred_contact_method: parsed.preferredContactMethod,
      notes: parsed.notes,
      consent: parsed.consent,
      source: "website",
      submitted_at: new Date().toISOString(),
    });

    if (error) {
      throw new Error(`Database insert failed: ${error.message}`);
    }

    await upsertGhlContact(parsed);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong while submitting the form.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
