const GHL_BASE_URL = "https://services.leadconnectorhq.com";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

type GhlLeadPayload = {
  fullName: string;
  email: string;
  phone: string | null;
  county: string | null;
  cropTypes: string | null;
  acreageRange: string | null;
  preferredContactMethod: string | null;
  notes: string | null;
};

export async function upsertGhlContact(payload: GhlLeadPayload) {
  const apiKey = getRequiredEnv("GHL_API_KEY");
  const locationId = getRequiredEnv("GHL_LOCATION_ID");

  const [firstName, ...lastNameParts] = payload.fullName.trim().split(" ");
  const lastName = lastNameParts.join(" ");
  const countyTag = payload.county?.toLowerCase() ?? "north-alabama";

  const response = await fetch(`${GHL_BASE_URL}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify({
      locationId,
      firstName,
      lastName: lastName || undefined,
      email: payload.email,
      phone: payload.phone || undefined,
      tags: ["north-alabama-drone-applicators", "north-alabama-service-interest", countyTag],
      source: "website_lead_form",
      customFields: [
        { key: "county", field_value: payload.county || "Other" },
        { key: "crop_types", field_value: payload.cropTypes || "Not provided" },
        { key: "acreage_range", field_value: payload.acreageRange || "" },
        {
          key: "preferred_contact_method",
          field_value: payload.preferredContactMethod || "",
        },
        { key: "notes", field_value: payload.notes || "" },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`GoHighLevel sync failed: ${response.status} ${errorBody}`);
  }
}

type GhlContactInquiryPayload = {
  fullName: string;
  email: string;
  phone: string | null;
  county: string;
  message: string;
};

export async function upsertGhlContactInquiry(payload: GhlContactInquiryPayload) {
  const apiKey = getRequiredEnv("GHL_API_KEY");
  const locationId = getRequiredEnv("GHL_LOCATION_ID");

  const [firstName, ...lastNameParts] = payload.fullName.trim().split(" ");
  const lastName = lastNameParts.join(" ");
  const countyTag = payload.county.toLowerCase();

  const response = await fetch(`${GHL_BASE_URL}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify({
      locationId,
      firstName,
      lastName: lastName || undefined,
      email: payload.email,
      phone: payload.phone || undefined,
      tags: [
        "north-alabama-drone-applicators",
        "website-contact-form",
        countyTag,
      ],
      source: "website_contact_form",
      customFields: [
        { key: "county", field_value: payload.county },
        { key: "notes", field_value: payload.message },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`GoHighLevel sync failed: ${response.status} ${errorBody}`);
  }
}
