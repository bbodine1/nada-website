/**
 * Generates public/downloads/nada-spray-spread-overview.pdf
 * Run: npm run build:pdf
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "downloads");
const outFile = path.join(outDir, "nada-spray-spread-overview.pdf");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const doc = new PDFDocument({ size: "LETTER", margins: { top: 56, bottom: 56, left: 56, right: 56 } });
const stream = fs.createWriteStream(outFile);
doc.pipe(stream);

doc.fontSize(22).fillColor("#1e3a0f").text("North Alabama Drone Applicators", { align: "center" });
doc.moveDown(0.3);
doc.fontSize(14).fillColor("#333").text("North Alabama Spray + Spread Overview", { align: "center" });
doc.moveDown(0.5);
doc.fontSize(9).fillColor("#666").text("Preliminary information for Tennessee Valley growers — not a contract or final quote.", {
  align: "center",
});
doc.moveDown(2);

function section(title) {
  doc.fontSize(13).fillColor("#1e3a0f").text(title);
  doc.moveDown(0.4);
  doc.fontSize(10).fillColor("#333");
}

section("Why drone application in North Alabama");
doc.text(
  "The Tennessee Valley throws narrow spray windows, humid air, and red clay that holds water. When the label window is open, waiting on a queue can mean a missed pass. Drone application can often operate when heavy ground equipment would rut headlands or stay parked. For dry product, spreading by air can place seed, fertilizer, or lime where terrain or wet holes make rigs a gamble.",
  { align: "left", lineGap: 2 },
);
doc.moveDown(1.2);

section("What we fly this season");
doc.text(
  "Our focus: precision drone spraying and drone spreading only. Examples include labeled liquid applications (herbicide, fungicide, insecticide, foliar nutrients per label and your consultant) and dry spreading such as cover crop seed, dry fertilizer, lime, and pasture overseeding. Other services (e.g. mapping) are not offered this season — join our list for future expansions.",
  { lineGap: 2 },
);
doc.moveDown(1.2);

section("Indicative cost per acre (preliminary)");
doc.text(
  "Final pricing depends on acres, terrain, product, flight logistics, and whether you need spray, spread, or both. The ranges below are placeholders for planning conversations only — not a quote.",
  { lineGap: 2 },
);
doc.moveDown(0.5);
doc.font("Helvetica-Bold").text("• Drone spray (liquid): ", { continued: true });
doc.font("Helvetica").text(
  "illustrative planning range often discussed in the $8–$18 / ac band for typical row-crop passes (product, terrain, and mobilization can move this up or down).",
);
doc.moveDown(0.4);
doc.font("Helvetica-Bold").text("• Drone spread (dry): ", { continued: true });
doc.font("Helvetica").text(
  "illustrative planning range often discussed in the $6–$15 / ac band depending on product, rate, and field layout.",
);
doc.moveDown(0.8);
doc.fontSize(9).fillColor("#666").text(
  "These ranges are preliminary planning bands only—not a quote. Confirm every job with a written estimate. Minimums and mobilization fees may apply by county cluster.",
  { lineGap: 2 },
);
doc.moveDown(1);

section("Where this business is headed");
doc.text(
  "We are building a managed service for North Alabama: certified Part 107 pilots, insured operations, and routes planned around Madison, Limestone, Morgan, Cullman, and Lawrence counties. Spray and spread are our core launch services; additional offerings may follow as we scale crews and equipment.",
  { lineGap: 2 },
);
doc.moveDown(1.2);

section("How to reserve a spot");
doc.text("Visit our site and submit the interest form:", { lineGap: 2 });
doc.fillColor("#1e3a0f").font("Helvetica-Bold").text("https://northalabamadroneapplicators.com", { link: "https://northalabamadroneapplicators.com", underline: true });
doc.moveDown(0.8);
doc.fillColor("#333").font("Helvetica").text(
  "Request the Spray + Spread Overview PDF at signup. We will follow up with county routing, timing, and next steps — no obligation.",
  { lineGap: 2 },
);

doc.end();

await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});

console.log(`Wrote ${path.relative(root, outFile)}`);
