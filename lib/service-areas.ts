export const cropApplicatorServiceAreas = [
  {
    county: "Madison",
    slug: "madison-county-al",
    label: "Madison County, AL",
    nearby: "Huntsville, Meridianville, New Market, Hazel Green, and Owens Cross Roads",
    fieldContext:
      "cotton, corn, soybean, wheat, hay, and forage acres near fast-growing residential edges, tree lines, and sensitive buffers",
    searchFocus: "crop applicators in Madison County, AL",
    routeNote:
      "Madison County jobs are evaluated for field shape, access, nearby homes, power lines, and whether a drone pass can solve timing or buffer problems better than a ground rig or airplane.",
  },
  {
    county: "Limestone",
    slug: "limestone-county-al",
    label: "Limestone County, AL",
    nearby: "Athens, Tanner, Elkmont, Belle Mina, and the Alabama-Tennessee line",
    fieldContext:
      "row-crop acres, river-bottom ground, wet spots, turn rows, and fields that can hold water after Tennessee Valley rain",
    searchFocus: "crop applicators in Limestone County, AL",
    routeNote:
      "Limestone County routing is built around practical spray windows, soil trafficability, and targeted acres where a drone can keep an application moving while heavy equipment waits.",
  },
  {
    county: "Morgan",
    slug: "morgan-county-al",
    label: "Morgan County, AL",
    nearby: "Decatur, Hartselle, Priceville, Eva, and Somerville",
    fieldContext:
      "corn, soybean, cotton, wheat, hay, and pasture acres with mixed field sizes, terraces, waterways, and edge work",
    searchFocus: "crop applicators in Morgan County, AL",
    routeNote:
      "Morgan County growers often compare ground rig speed against access limits. We review the field plan and identify where drone spraying or spreading belongs in the application mix.",
  },
  {
    county: "Cullman",
    slug: "cullman-county-al",
    label: "Cullman County, AL",
    nearby: "Cullman, Fairview, Hanceville, Vinemont, and Holly Pond",
    fieldContext:
      "rolling crop, hay, forage, and pasture acres where field shape, slope, and soft headlands can complicate ground equipment",
    searchFocus: "crop applicators in Cullman County, AL",
    routeNote:
      "Cullman County field reviews focus on terrain, access, product fit, and whether aerial drone application can handle patches, strips, or wet areas without rutting.",
  },
  {
    county: "Lawrence",
    slug: "lawrence-county-al",
    label: "Lawrence County, AL",
    nearby: "Moulton, Town Creek, Courtland, Hillsboro, and North Courtland",
    fieldContext:
      "cotton, soybean, corn, wheat, hay, and pasture acres across broad fields, bottoms, and irregular blocks",
    searchFocus: "crop applicators in Lawrence County, AL",
    routeNote:
      "Lawrence County application requests are reviewed against acreage, crop stage, herbicide or fungicide timing, and whether drone work should supplement a ground rig or crop duster.",
  },
] as const;

export type CropApplicatorServiceArea = (typeof cropApplicatorServiceAreas)[number];

export function getCropApplicatorServiceArea(slug: string) {
  return cropApplicatorServiceAreas.find((area) => area.slug === slug);
}

