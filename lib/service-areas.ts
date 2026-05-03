export type CountyName = "Madison" | "Limestone" | "Morgan" | "Cullman" | "Lawrence";

export type FaqItem = {
  question: string;
  answer: string;
};

export type CountyProfile = {
  county: CountyName;
  towns: readonly string[];
  townsNote?: string;
  /** Appended after the town list, e.g. “rural Madison County” */
  nearbySuffix?: string;
  crops: readonly string[];
  fieldConditions: readonly string[];
  useCases: readonly string[];
  countyFaq: readonly FaqItem[];
  leadParagraph: string;
  cropApplicatorMetaDescription: string;
  methodComparisonIntro: string;
  applicationChecklist: readonly string[];
  /** One line for county cards on `/crop-applicators` */
  hubSummary: string;
};

function formatNearbyList(parts: readonly string[]): string {
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

export function nearbyFromProfile(profile: Pick<CountyProfile, "towns" | "townsNote" | "nearbySuffix">): string {
  const segments = [...profile.towns, ...(profile.townsNote ? [profile.townsNote] : [])];
  if (profile.nearbySuffix) {
    segments.push(profile.nearbySuffix);
  }
  return formatNearbyList(segments);
}

const madisonProfile = {
  county: "Madison",
  towns: ["Huntsville", "Meridianville", "New Market", "Hazel Green", "Owens Cross Roads"],
  nearbySuffix: "rural Madison County",
  crops: ["cotton", "corn", "soybeans", "wheat", "hay", "forage"],
  fieldConditions: [
    "Fast-growing residential edges, tree lines, and sensitive buffers running next to working row-crop and hay ground",
    "Smaller blocks, end rows, and patchy acres where full-size rigs lose efficiency on turns and headlands",
    "Tennessee Valley weather patterns that dry the field on top while low spots and access lanes stay soft",
  ],
  useCases: [
    "Spray passes (herbicide, fungicide, insecticide, foliar nutrients) when the calendar is tight but part of the field is still difficult for wheels",
    "Targeted work along wet holes, borders, subdivision edges, and irregular corners without threading heavy equipment through obstacles",
    "Split plans where most acres stay on a ground rig or airplane but a drone handles buffers, setbacks, or timing-critical strips",
  ],
  leadParagraph:
    "Crop application around Huntsville and Meridianville often mixes cotton, corn, soybeans, wheat, hay, and forage acres with subdivision edges, tree lines, and buffer-sensitive strips—exactly where ground rigs slow down and a controlled aerial pass can keep the program moving.",
  cropApplicatorMetaDescription:
    "Madison County crop applicator guidance for drone spraying, crop dusting, and ground rigs near Huntsville, Meridianville, New Market, Hazel Green, and Owens Cross Roads—cotton through forage and sensitive edges.",
  methodComparisonIntro:
    "Madison County fields are weighed for geometry, obstacles, nearby homes, power lines, and whether spray stewardship favors a nimble aerial pass on part of the acreage.",
  applicationChecklist: [
    "Herbicide, fungicide, insecticide, or foliar nutrient timing when buffers or geometry squeeze the rig",
    "Residential edges, utility corridors, small blocks, or wet pockets where airplane overspray risk or rig access is the limiting factor",
    "Broad-acre jobs where traditional aerial or a rig still owns most acres but a patch needs a different tool",
    "Cover crop seed, dry fertilizer, lime, or pasture work where drone spreading fits the labeled product and field layout",
  ],
  hubSummary:
    "Cotton through forage acres with Huntsville-area buffers, tree lines, patchy blocks, and valley rain pockets that split wheel access.",
  countyFaq: [
    {
      question: "Do Madison County farms near Huntsville still use ground rigs for most acres?",
      answer:
        "Often yes. We usually discuss where the rig or airplane stays fastest and where a drone pass makes sense for edges, wet areas, setbacks, or timing. The goal is the right tool for each part of the field, not forcing one method everywhere.",
    },
    {
      question: "How do you handle spray concerns next to neighborhoods or tree lines?",
      answer:
        "We review wind, product label requirements, drift buffers, and field layout with you before any go decision. If the stewarded call is to wait or shift method, we say so—especially on Madison County edges where houses and lanes sit tight to crop ground.",
    },
    {
      question: "What crops do you field-fit most often in Madison County?",
      answer:
        "Cotton, corn, soybeans, wheat, hay, and forage come up constantly, but the decision is always field-specific: stage, acres, access, target pass, and weather—not the county average.",
    },
    {
      question: "Can drones cover an entire large Madison County field?",
      answer:
        "Sometimes, but not by default. On very large, open blocks, traditional aerial or a ground rig may stay more efficient. We recommend drones when access, wet ground, edges, or timing makes them the practical choice for some or all of the acres.",
    },
    {
      question: "What should I send for a Madison County review?",
      answer:
        "County, nearest community, crop, acreage rough size, target pass, product direction, timing pressure, and notes on gates, wet spots, power lines, or buffers. Photos or maps of problem corners speed up the conversation.",
    },
  ],
} as const satisfies Omit<CountyProfile, "townsNote"> & { townsNote?: string };

const limestoneProfile = {
  county: "Limestone",
  towns: ["Athens", "Tanner", "Elkmont", "Belle Mina", "Ardmore"],
  townsNote: "the Alabama–Tennessee line",
  crops: ["cotton", "corn", "soybeans", "wheat", "hay", "forage"],
  fieldConditions: [
    "River-bottom and terrace ground that holds water differently than the higher benches after Tennessee Valley rains",
    "Red clay pulls and traffic lanes that rut when heavy rigs move too soon",
    "Long rows with wet pockets, ditches, and turn rows where timing pressure does not wait on perfect dryness",
  ],
  useCases: [
    "Partial-field and border sprays when Athens-area or Ardmore-side blocks dry unevenly after valley rains",
    "Keeping herbicide, fungicide, insecticide, and foliar passes moving when part of the field should stay parked for wheels",
    "Working low spots, ditches, and turn rows without tearing up headlands ahead of the next rain",
  ],
  leadParagraph:
    "Drone spraying in Limestone County is often a fit for cotton, corn, soybeans, and wheat fields near Athens, Tanner, Elkmont, and Belle Mina where wet ground, end rows, and timing pressure make ground rig access harder.",
  cropApplicatorMetaDescription:
    "Limestone County crop applicators: compare drone spraying, crop dusting, and ground rigs for row-crop and hay acres near Athens, river-bottom ground, and Tennessee Valley rain windows.",
  methodComparisonIntro:
    "Limestone County plans usually come down to soil trafficability after rain, row length, and whether a drone can keep the pass moving on the acres that stay soft while other options wait.",
  applicationChecklist: [
    "Herbicide, fungicide, insecticide, or foliar nutrients when river-bottom or clay ground delays the rig",
    "Turn rows, pull rows, partial fields, or waterway edges where ruts would be costly",
    "Spray timing that conflicts with wheel access on Elkmont or Ardmore-area blocks after a wet stretch",
    "Cover crop seed or dry product work where labeled rates and field shape fit drone spreading",
  ],
  hubSummary:
    "River-bottom row crops and hay near Athens and Ardmore—red clay, wet pockets, and timing pressure after Tennessee Valley rains.",
  countyFaq: [
    {
      question: "Why is Limestone County often about timing versus ground conditions?",
      answer:
        "Row-crop programs do not pause for perfect trafficability. After valley rains, many fields have a dry-looking top and a soft bottom—or wet holes along ditches and turn rows. We help decide when a drone keeps the labeled pass on schedule without trading ruts for speed.",
    },
    {
      question: "Do you work both sides of the Athens trade area and toward Ardmore?",
      answer:
        "Yes. Routing is planned around Athens, Tanner, Elkmont, Belle Mina, Ardmore, and nearby farm communities. Tell us gates, field roads, and wet areas so we can match the flight plan to real access.",
    },
    {
      question: "Is drone application always the right call on wet ground?",
      answer:
        "No. Labels, wind, buffers, and crop stage still gate the job. If a ground rig can run cleanly and safely—or traditional aerial is the better stewarded choice—we will point you that direction.",
    },
    {
      question: "Can you coordinate with my ground applicator or crop duster?",
      answer:
        "That is common. Many Limestone plans split acres: rigs or airplanes on the clean ground, drones on wet holes, borders, or partial blocks. Share contact timing and field maps so the handoff stays clear.",
    },
    {
      question: "What crops are most common on Limestone County drone reviews?",
      answer:
        "Cotton, corn, soybeans, wheat, hay, and forage show up most, but we still review every field for stage, acres, product, and conditions rather than assuming a crop template.",
    },
  ],
} as const satisfies CountyProfile;

const morganProfile = {
  county: "Morgan",
  towns: ["Decatur", "Hartselle", "Priceville", "Eva", "Somerville"],
  nearbySuffix: "surrounding Morgan County farm ground",
  crops: ["corn", "soybeans", "cotton", "wheat", "hay", "pasture"],
  fieldConditions: [
    "Mixed field sizes with terraces, grassed waterways, and wood edges that break up efficient rig paths",
    "River-influenced bottoms and transitions where soil moisture changes field-to-field after rain",
    "Row-crop and pasture acres that may need spray in one window and dry product work in another",
  ],
  useCases: [
    "Drone spraying for herbicide, fungicide, insecticide, and foliar programs when terraces or waterways split the field into awkward rig geometry",
    "Drone spreading for cover crop seed, dry fertilizer, lime, or pasture overseeding when product and rate fit aerial placement",
    "Partial-field passes where Decatur-area traffic, soft headlands, or edge acres need a different access pattern than the main block",
  ],
  leadParagraph:
    "Morgan County farms from Hartselle to Priceville often rotate corn, soybeans, cotton, wheat, hay, and pasture across terraces, waterways, and variable block sizes—so applicator decisions are as much about field geometry and moisture pockets as about acreage totals.",
  cropApplicatorMetaDescription:
    "Morgan County crop applicator help near Decatur, Hartselle, and Priceville: drone spraying and spreading versus crop dusters and ground rigs on terrace, waterway, and mixed-size fields.",
  methodComparisonIntro:
    "Morgan County reviews weigh ground rig efficiency on the clean acres against drone access on waterways, terraces, headlands, and soft spots that often drive the real bottlenecks.",
  applicationChecklist: [
    "Tight fungicide or herbicide timing when part of the field is still limiting rig travel",
    "Waterway strips, terrace breaks, or pasture edges where a partial aerial pass avoids extra wheel traffic",
    "Programs that may pair spray with dry product work in the same season on different acres",
    "Coordination when traditional aerial fits the open middle but not the awkward ends",
  ],
  hubSummary:
    "Corn, soybeans, cotton, wheat, hay, and pasture across terraces, waterways, and mixed-size blocks from Decatur to Hartselle.",
  countyFaq: [
    {
      question: "How do terraces and waterways change Morgan County applicator choice?",
      answer:
        "They interrupt straight rig passes and can leave awkward triangles, pinch points, and soft crossings. Drones often fit those strips while rigs stay on larger rectangles—assuming labels and weather support an aerial application.",
    },
    {
      question: "Do you spread fertilizer or lime near Decatur and Hartselle?",
      answer:
        "We review drone spreading when the product, labeled use, rate, and field layout fit. Share target material, approximate acreage, and access constraints so we can compare drone placement against spinner rigs or other methods honestly.",
    },
    {
      question: "When is a crop duster still the better Morgan County tool?",
      answer:
        "Large, open blocks with favorable wind and straightforward stewardship can favor traditional aerial for throughput. We recommend drones when geometry, buffers, partial-field needs, or timing on wet acres argues for a more segmented approach.",
    },
    {
      question: "Can pasture acres be reviewed separately from row crop?",
      answer:
        "Yes. Pasture timing, fence lines, gates, and drinking-water setbacks change the picture. Tell us stocking goals, product intent, and access so we can separate pasture passes from nearby row-crop plans.",
    },
    {
      question: "What information speeds up a Morgan County assessment?",
      answer:
        "Approximate location relative to Decatur or Hartselle, crop, acres, target pass, product direction, recent weather, and notes on waterways, terraces, or soft zones. Yield maps or phone photos of headlands help.",
    },
  ],
} as const satisfies Omit<CountyProfile, "townsNote"> & { townsNote?: string };

const cullmanProfile = {
  county: "Cullman",
  towns: ["Cullman", "Fairview", "Hanceville", "Vinemont", "Holly Pond"],
  nearbySuffix: "rolling Cullman County farms",
  crops: ["corn", "soybeans", "hay", "forage", "pasture", "cover crops"],
  fieldConditions: [
    "Rolling slopes, shorter fields, and lanes that limit where heavy spreaders can travel without wash or rut risk",
    "Hay, forage, and pasture strips with irregular shapes and soft gates that slow ground equipment",
    "Headlands and knolls that dry at different speeds than draws after rain",
  ],
  useCases: [
    "Drone spreading for cover crop seed, dry fertilizer, lime, and pasture overseeding when terrain or wet ground punishes spinner traffic",
    "Reaching hillside strips, odd corners, and remote gates without dragging equipment through marginal access",
    "Pairing aerial dry work with spray plans elsewhere on the farm when routing and product timing line up",
  ],
  leadParagraph:
    "Cullman County ground is often rollier and more segmented than valley bottomland—hay, forage, pasture, and row-crop blocks around Cullman, Hanceville, and Holly Pond frequently need dry product placement without tearing up headlands or side hills.",
  cropApplicatorMetaDescription:
    "Cullman County crop applicators: drone spreading and spraying versus ground rigs on rolling hay, pasture, and row-crop acres near Cullman, Hanceville, and Vinemont.",
  methodComparisonIntro:
    "Cullman County field-fit work emphasizes slope, traction, gate access, and whether dry products or sprays belong in the air on part of the acreage versus the whole farm.",
  applicationChecklist: [
    "Cover crop seeding or dry fertilizer when slopes, soft pulls, or tight gates limit ground spreaders",
    "Lime or pasture renewal talks where helicopter-style traffic is costly or impractical",
    "Strip or patch work on hillsides and odd shapes that rigs would have to chase slowly",
    "Spray requests on the same farm or route when labels and weather support drone application",
  ],
  hubSummary:
    "Rolling hay, pasture, and row-crop acres where slopes, gates, and soft headlands complicate spinner rigs and heavy traffic.",
  countyFaq: [
    {
      question: "Is Cullman County more about spreading than spraying?",
      answer:
        "Spreading questions are common because terrain and pasture layout make ground equipment expensive in time and rut risk. We still review spray passes when crop stage, labels, and conditions support drones—many farms need both across a season.",
    },
    {
      question: "How do slopes affect go/no-go for drone work?",
      answer:
        "Slope changes swath placement, drift management, and how we stage equipment. We walk through field maps, obstacles, and weather with you before committing. If stewardship favors waiting or another method, we will say so.",
    },
    {
      question: "Can drones cover pasture overseeding effectively?",
      answer:
        "When seed size, rate, and field shape fit aerial placement, drones can reach brushy edges, steep lanes, and soft ground that discourages heavy traffic. We still confirm species, product, and labeled use before recommending flight.",
    },
    {
      question: "Do you coordinate with retailers and nutrition plans?",
      answer:
        "Yes. Bring your rate goal, product name, and any blend restrictions. We align the conversation with labeled use and practical field placement—not just whether a drone can fly.",
    },
    {
      question: "What should Cullman growers include in first contact?",
      answer:
        "Nearest town, crop or pasture goal, approximate acres, target product, timing window, and photos of slopes, gates, or wet draws. That is enough to start a realistic applicator comparison.",
    },
  ],
} as const satisfies Omit<CountyProfile, "townsNote"> & { townsNote?: string };

const lawrenceProfile = {
  county: "Lawrence",
  towns: ["Moulton", "Town Creek", "Courtland", "Hillsboro", "North Courtland"],
  nearbySuffix: "Lawrence County farm communities",
  crops: ["cotton", "soybeans", "corn", "wheat", "hay", "pasture"],
  fieldConditions: [
    "Broad rectangular fields alongside irregular wood lines, pasture blocks, and creek draws that change access field-to-field",
    "Bottoms and subtle low areas that hold moisture longer than mapped “wet” acres",
    "Mixed cotton, corn, soybean, wheat, hay, and pasture rotations with different timing pressure in the same week",
  ],
  useCases: [
    "Supplementing ground rigs or crop dusters when Moulton-area cotton or soybean acres need a pass but part of the field is still limiting wheels",
    "Drone spreading for cover crops, dry fertilizer, lime, or pasture work on blocks where traditional equipment is booked or access is awkward",
    "Field-by-field decisions for herbicide, fungicide, insecticide, or foliar timing when Lawrence County rains split the farm into wet and dry zones",
  ],
  leadParagraph:
    "Lawrence County cropping around Moulton and Town Creek blends cotton, soybeans, corn, wheat, hay, and pasture across big open fields, creek draws, and pasture edges—so applicator choice usually hinges on which acres are wheel-ready when the labeled window arrives.",
  cropApplicatorMetaDescription:
    "Lawrence County crop applicators near Moulton, Town Creek, and Courtland: drone spraying and spreading versus crop dusters and ground rigs on bottoms, pastures, and mixed rotations.",
  methodComparisonIntro:
    "Lawrence County reviews prioritize acreage layout near bottoms and draws, timing versus soil moisture, and whether drones should complement your rig or airplane rather than replace them outright.",
  applicationChecklist: [
    "Herbicide or fungicide timing when part of the farm is traffic-ready and part is not",
    "Pasture or hay renewal needing dry product without chewing up soft gates",
    "Irregular blocks or wood-lined acres where airplanes need careful segmentation",
    "Combining drone work with booked rigs or dusters during peak weeks",
  ],
  hubSummary:
    "Cotton, soybeans, corn, wheat, hay, and pasture across broad fields, bottoms, draws, and pasture transitions near Moulton.",
  countyFaq: [
    {
      question: "How do Lawrence County growers decide between drone, rig, and airplane?",
      answer:
        "Start with acres, obstacles, buffers, and moisture. Large clean blocks may stay with traditional aerial; reachable dry ground favors rigs; wet holes, pasture transitions, or awkward shapes often justify a drone segment. We spell out that split plainly.",
    },
    {
      question: "Are bottoms the only tricky ground in Lawrence County?",
      answer:
        "Bottoms matter, but so do shallow drainage signatures next to pastures, terraces near Town Creek, and field roads that rut first. Share where equipment actually traveled last season—we match recommendations to real traffic patterns.",
    },
    {
      question: "Can drones help when my ground rig is booked?",
      answer:
        "Sometimes. If labels, weather, and field-fit align, drones can cover targeted acres while your rig finishes elsewhere. We still decline work when stewardship says wait or shift method.",
    },
    {
      question: "Do you handle pasture differently than row crop?",
      answer:
        "Yes. Fence lines, waterers, slopes, and grazing windows change placement priorities. Tell us stocking goals and whether livestock need to be rotated during application.",
    },
    {
      question: "What should I send for a Lawrence County review?",
      answer:
        "Nearest community (Moulton, Town Creek, Courtland, etc.), crops involved, approximate acres per block, target pass, timing pressure, and notes on bottoms, gates, or aerial obstacles. Photos of questionable corners help.",
    },
  ],
} as const satisfies Omit<CountyProfile, "townsNote"> & { townsNote?: string };

export const countyProfiles = {
  Madison: madisonProfile,
  Limestone: limestoneProfile,
  Morgan: morganProfile,
  Cullman: cullmanProfile,
  Lawrence: lawrenceProfile,
} as const;

export type CountyProfileKey = keyof typeof countyProfiles;

export function getCountyProfile(county: CountyName): CountyProfile {
  return countyProfiles[county];
}

export const cropApplicatorServiceAreas = [
  {
    ...madisonProfile,
    slug: "madison-county-al",
    label: "Madison County, AL",
    searchFocus: "crop applicators in Madison County, AL",
    nearby: nearbyFromProfile(madisonProfile),
  },
  {
    ...limestoneProfile,
    slug: "limestone-county-al",
    label: "Limestone County, AL",
    searchFocus: "crop applicators in Limestone County, AL",
    nearby: nearbyFromProfile(limestoneProfile),
  },
  {
    ...morganProfile,
    slug: "morgan-county-al",
    label: "Morgan County, AL",
    searchFocus: "crop applicators in Morgan County, AL",
    nearby: nearbyFromProfile(morganProfile),
  },
  {
    ...cullmanProfile,
    slug: "cullman-county-al",
    label: "Cullman County, AL",
    searchFocus: "crop applicators in Cullman County, AL",
    nearby: nearbyFromProfile(cullmanProfile),
  },
  {
    ...lawrenceProfile,
    slug: "lawrence-county-al",
    label: "Lawrence County, AL",
    searchFocus: "crop applicators in Lawrence County, AL",
    nearby: nearbyFromProfile(lawrenceProfile),
  },
] as const;

export type CropApplicatorServiceArea = (typeof cropApplicatorServiceAreas)[number];

export function getCropApplicatorServiceArea(slug: string) {
  return cropApplicatorServiceAreas.find((area) => area.slug === slug);
}

const localDroneServicePageDefs = [
  {
    county: "Madison",
    slug: "drone-spraying-madison-county-al",
    title: "Drone Spraying in Madison County, AL",
    serviceType: "Drone spraying",
    metaDescription:
      "Drone spraying in Madison County, AL for cotton, corn, soybeans, wheat, hay, and forage acres near Huntsville, Meridianville, and New Market.",
    cta: "Request Madison County Spray Review",
  },
  {
    county: "Limestone",
    slug: "drone-spraying-limestone-county-al",
    title: "Drone Spraying in Limestone County, AL",
    serviceType: "Drone spraying",
    metaDescription:
      "Drone spraying in Limestone County, AL for row-crop acres, river-bottom fields, wet spots, turn rows, and timing-sensitive spray windows.",
    cta: "Request Limestone County Spray Review",
  },
  {
    county: "Morgan",
    slug: "drone-crop-application-morgan-county-al",
    title: "Drone Crop Application in Morgan County, AL",
    serviceType: "Drone crop application",
    metaDescription:
      "Drone crop application in Morgan County, AL for corn, soybean, cotton, wheat, hay, and pasture acres near Decatur, Hartselle, and Priceville.",
    cta: "Request Morgan County Application Review",
  },
  {
    county: "Cullman",
    slug: "drone-spreading-cullman-county-al",
    title: "Drone Spreading in Cullman County, AL",
    serviceType: "Drone spreading",
    metaDescription:
      "Drone spreading in Cullman County, AL for cover crop seed, fertilizer, lime, and pasture overseeding on rolling crop, hay, and forage acres.",
    cta: "Request Cullman County Spreading Review",
  },
  {
    county: "Lawrence",
    slug: "agricultural-drone-services-lawrence-county-al",
    title: "Agricultural Drone Services in Lawrence County, AL",
    serviceType: "Agricultural drone services",
    metaDescription:
      "Agricultural drone services in Lawrence County, AL for cotton, soybeans, corn, wheat, hay, and pasture across Moulton, Town Creek, and Courtland.",
    cta: "Request Lawrence County Drone Review",
  },
] as const;

export const localDroneServicePages = localDroneServicePageDefs.map((def) => {
  const profile = countyProfiles[def.county];
  return {
    ...def,
    nearby: nearbyFromProfile(profile),
    towns: profile.towns,
    crops: profile.crops,
    fieldConditions: profile.fieldConditions,
    useCases: profile.useCases,
    countyFaq: profile.countyFaq,
    leadParagraph: profile.leadParagraph,
  };
});

export type LocalDroneServicePage = (typeof localDroneServicePages)[number];

export function getLocalDroneServicePage(slug: string) {
  return localDroneServicePages.find((page) => page.slug === slug);
}
