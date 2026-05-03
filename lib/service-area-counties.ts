/** Counties accepted by `/api/lead` and `/api/contact` (plus Other). */
export const SERVICE_AREA_COUNTIES = [
	"Cullman",
	"Lawrence",
	"Limestone",
	"Madison",
	"Morgan",
	"Other",
] as const;

export type ServiceAreaCounty = (typeof SERVICE_AREA_COUNTIES)[number];

export const SERVICE_AREA_COUNTY_SET = new Set<string>(SERVICE_AREA_COUNTIES);
