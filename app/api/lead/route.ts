import { NextRequest, NextResponse } from "next/server";

import { sendSubmissionEmails } from "@/lib/email";
import { upsertGhlContact } from "@/lib/ghl";
import { getSupabaseAdminClient } from "@/lib/supabase";

const allowedCounties = new Set([
  "Colbert",
  "DeKalb",
  "Jackson",
  "Marshall",
  "Madison",
  "Limestone",
  "Morgan",
  "Lawrence",
  "Other",
]);

const ipRequestStore = new Map<string, number[]>();

type LeadPayload = {
  stage?: unknown;
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
  const stage =
    asTrimmedString(body.stage) === "step1_capture" ? "step1_capture" : "final_submit";
  const fullName = asTrimmedString(body.fullName);
  const email = asTrimmedString(body.email).toLowerCase();
  const phone = asTrimmedString(body.phone) || null;
  const county = asTrimmedString(body.county) || "Other";
  const cropTypes = asTrimmedString(body.cropTypes) || "Not provided";
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
  if (county && !allowedCounties.has(county)) {
    throw new Error("Please select a valid county in our service area.");
  }

  return {
    stage,
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

    if (parsed.stage === "step1_capture") {
      const { error } = await supabase.from("interest_leads").insert({
        full_name: parsed.fullName,
        email: parsed.email,
        phone: null,
        county: "Other",
        crop_types: "Not provided",
        acreage_range: null,
        preferred_contact_method: null,
        notes: "Captured at step 1",
        consent: true,
        source: "website_step1",
        submitted_at: new Date().toISOString(),
      });

      if (error) {
        throw new Error(`Database insert failed: ${error.message}`);
      }

      return NextResponse.json({ ok: true, captured: true });
    }

    const { data: existingLead } = await supabase
      .from("interest_leads")
      .select("id")
      .eq("email", parsed.email)
      .order("submitted_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let error: { message: string } | null = null;
    const leadPayload = {
      full_name: parsed.fullName,
      email: parsed.email,
      phone: parsed.phone,
      county: parsed.county,
      crop_types: parsed.cropTypes,
      acreage_range: parsed.acreageRange,
      preferred_contact_method: parsed.preferredContactMethod,
      notes: parsed.notes,
      consent: parsed.consent,
      source: "website_final",
      submitted_at: new Date().toISOString(),
    };

    if (existingLead?.id) {
      const updateResult = await supabase
        .from("interest_leads")
        .update(leadPayload)
        .eq("id", existingLead.id);
      error = updateResult.error;
    } else {
      const insertResult = await supabase.from("interest_leads").insert(leadPayload);
      error = insertResult.error;
    }

    if (error) {
      throw new Error(`Database insert failed: ${error.message}`);
    }

    await upsertGhlContact(parsed);
    await sendSubmissionEmails({
      firstName: parsed.fullName.split(" ")[0] || "there",
      email: parsed.email,
      county: parsed.county,
      cropTypes: parsed.cropTypes,
      primaryInterest: parsed.preferredContactMethod || "Not provided",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong while submitting the form.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
