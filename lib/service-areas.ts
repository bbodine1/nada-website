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

export const localDroneServicePages = [
  {
    county: "Madison",
    slug: "drone-spraying-madison-county-al",
    title: "Drone Spraying in Madison County, AL",
    serviceType: "Drone spraying",
    metaDescription:
      "Drone spraying in Madison County, AL for cotton, corn, soybeans, wheat, hay, and forage acres near Huntsville, Meridianville, and New Market.",
    nearby: "Huntsville, Meridianville, New Market, Hazel Green, Owens Cross Roads, and rural Madison County",
    crops: ["cotton", "corn", "soybeans", "wheat", "hay", "forage"],
    fieldConditions: [
      "Residential growth, field edges, tree lines, and sensitive buffers close to working crop ground",
      "Small blocks, end rows, and patch work where ground rigs can struggle to turn cleanly",
      "Tennessee Valley rain windows that leave low spots soft after the rest of the field starts to dry",
    ],
    useCases: [
      "Fungicide, herbicide, insecticide, and foliar nutrient passes when timing is tight",
      "Targeted spray work along wet holes, buffers, field borders, and irregular corners",
      "Supplementing a ground rig or crop duster when part of the field needs a more controlled aerial pass",
    ],
    cta: "Request Madison County Spray Review",
  },
  {
    county: "Limestone",
    slug: "drone-spraying-limestone-county-al",
    title: "Drone Spraying in Limestone County, AL",
    serviceType: "Drone spraying",
    metaDescription:
      "Drone spraying in Limestone County, AL for row-crop acres, river-bottom fields, wet spots, turn rows, and timing-sensitive spray windows.",
    nearby: "Athens, Tanner, Elkmont, Belle Mina, Ardmore, and the Alabama-Tennessee line",
    crops: ["cotton", "corn", "soybeans", "wheat", "hay", "forage"],
    fieldConditions: [
      "River-bottom ground, red clay, and fields that can hold water after Tennessee Valley rain",
      "Large row-crop blocks with wet pockets, turn rows, ditches, and uneven trafficability",
      "Spring and late-season windows where soil conditions may lag behind product timing",
    ],
    useCases: [
      "Keeping herbicide, fungicide, and foliar passes moving when a ground rig should stay parked",
      "Spraying wet spots, end rows, borders, and partial-field acres without adding ruts",
      "Coordinating drone work with broader ground rig or traditional aerial application plans",
    ],
    cta: "Request Limestone County Spray Review",
  },
  {
    county: "Morgan",
    slug: "drone-crop-application-morgan-county-al",
    title: "Drone Crop Application in Morgan County, AL",
    serviceType: "Drone crop application",
    metaDescription:
      "Drone crop application in Morgan County, AL for corn, soybean, cotton, wheat, hay, and pasture acres near Decatur, Hartselle, and Priceville.",
    nearby: "Decatur, Hartselle, Priceville, Eva, Somerville, and surrounding Morgan County farm ground",
    crops: ["corn", "soybeans", "cotton", "wheat", "hay", "pasture"],
    fieldConditions: [
      "Mixed field sizes, terraces, waterways, and edges that can complicate full-size equipment",
      "Soft headlands and low areas after rain where traffic can create rut repair work",
      "Row-crop and forage acres that may need spray or spreading support in the same season",
    ],
    useCases: [
      "Drone spraying for herbicide, fungicide, insecticide, and foliar nutrient programs",
      "Drone spreading for cover crop seed, dry fertilizer, lime, and pasture overseeding where product fit allows",
      "Partial-field application around waterways, terraces, tree lines, and field edges",
    ],
    cta: "Request Morgan County Application Review",
  },
  {
    county: "Cullman",
    slug: "drone-spreading-cullman-county-al",
    title: "Drone Spreading in Cullman County, AL",
    serviceType: "Drone spreading",
    metaDescription:
      "Drone spreading in Cullman County, AL for cover crop seed, fertilizer, lime, and pasture overseeding on rolling crop, hay, and forage acres.",
    nearby: "Cullman, Fairview, Hanceville, Vinemont, Holly Pond, and rolling Cullman County farms",
    crops: ["corn", "soybeans", "hay", "forage", "pasture", "cover crops"],
    fieldConditions: [
      "Rolling ground, slopes, tight lanes, and irregular field shapes that make ground traffic harder",
      "Soft headlands, pasture strips, and small fields where equipment access can limit spreading plans",
      "Hay, forage, and crop acres that need dry product placement without tearing up wet ground",
    ],
    useCases: [
      "Cover crop seeding, dry fertilizer, lime, and pasture overseeding where the product and rate fit drone spreading",
      "Reaching strips, patches, soft areas, and odd-shaped acres without dragging heavy equipment through them",
      "Pairing dry spreading with planned spray work for a coordinated North Alabama route",
    ],
    cta: "Request Cullman County Spreading Review",
  },
  {
    county: "Lawrence",
    slug: "agricultural-drone-services-lawrence-county-al",
    title: "Agricultural Drone Services in Lawrence County, AL",
    serviceType: "Agricultural drone services",
    metaDescription:
      "Agricultural drone services in Lawrence County, AL for cotton, soybeans, corn, wheat, hay, and pasture across Moulton, Town Creek, and Courtland.",
    nearby: "Moulton, Town Creek, Courtland, Hillsboro, North Courtland, and Lawrence County farm communities",
    crops: ["cotton", "soybeans", "corn", "wheat", "hay", "pasture"],
    fieldConditions: [
      "Broad fields, bottoms, irregular blocks, and acres where access can change quickly after rain",
      "Crop and pasture ground with wet holes, waterways, field borders, and uneven trafficability",
      "Application plans that may need drone work beside a ground rig or crop duster",
    ],
    useCases: [
      "Drone spraying for labeled herbicide, fungicide, insecticide, and foliar nutrient applications",
      "Drone spreading for cover crop seed, dry fertilizer, lime, and pasture overseeding when field-fit checks out",
      "Reviewing crop stage, acreage, product plan, timing pressure, and access before recommending the method",
    ],
    cta: "Request Lawrence County Drone Review",
  },
] as const;

export type LocalDroneServicePage = (typeof localDroneServicePages)[number];

export function getLocalDroneServicePage(slug: string) {
  return localDroneServicePages.find((page) => page.slug === slug);
}

