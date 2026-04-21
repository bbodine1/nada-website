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
  county: string;
  cropTypes: string;
  acreageRange: string | null;
  preferredContactMethod: string | null;
  notes: string | null;
};

export async function upsertGhlContact(payload: GhlLeadPayload) {
  const apiKey = getRequiredEnv("GHL_API_KEY");
  const locationId = getRequiredEnv("GHL_LOCATION_ID");

  const [firstName, ...lastNameParts] = payload.fullName.trim().split(" ");
  const lastName = lastNameParts.join(" ");

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
      tags: ["north-alabama-drone-applicators", "fall-2026-interest", payload.county.toLowerCase()],
      source: "website_lead_form",
      customFields: [
        { key: "county", field_value: payload.county },
        { key: "crop_types", field_value: payload.cropTypes },
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
