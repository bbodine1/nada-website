import { LeadInterestForm } from "@/components/lead-interest-form";

export default function Home() {
  return (
    <div className="bg-zinc-50 text-zinc-900">
      <main className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <section className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
              North Alabama Drone Applicators
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Precision drone spraying and spreading for North Alabama farms.
            </h1>
            <p className="text-lg leading-8 text-zinc-700">
              We are launching for the Fall 2026 season and building a priority
              list now. If your operation is in Madison, Limestone, Morgan,
              Cullman, or Lawrence County, join early to get first access to our
              services.
            </p>
            <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-5 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-zinc-800">Why drones</p>
                <p className="text-sm text-zinc-600">
                  Reduce soil compaction and reach wet or difficult ground.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-800">Who we serve</p>
                <p className="text-sm text-zinc-600">
                  Row crops, pasture operations, and diversified farms.
                </p>
              </div>
            </div>
          </div>
          <div id="interest-form">
            <LeadInterestForm />
          </div>
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Fast turnarounds during narrow spray windows.",
            "Targeted coverage with low-impact field access.",
            "Drift-conscious operation and planning.",
            "Service area dedicated to North Alabama growers.",
          ].map((benefit) => (
            <article
              key={benefit}
              className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700"
            >
              {benefit}
            </article>
          ))}
        </section>

        <section className="mt-14 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Counties we plan to serve</h2>
          <p className="mt-3 text-zinc-700">
            Madison, Limestone, Morgan, Cullman, and Lawrence counties are our
            core launch area. Joining now helps us prioritize routes and staffing
            ahead of the 2026 season.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Madison", "Limestone", "Morgan", "Cullman", "Lawrence"].map(
              (county) => (
                <span
                  key={county}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700"
                >
                  {county}
                </span>
              ),
            )}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-green-200 bg-green-50 p-8">
          <h2 className="text-2xl font-bold text-green-900">
            Get on the Fall 2026 priority list
          </h2>
          <p className="mt-3 max-w-2xl text-green-900/90">
            Share your email and a few operation details so we can contact you
            first when bookings open. Early interest helps us shape service
            schedules by county and crop type.
          </p>
          <a
            href="#interest-form"
            className="mt-5 inline-flex rounded-md bg-green-700 px-5 py-2 font-semibold text-white hover:bg-green-800"
          >
            Submit interest
          </a>
        </section>

        <footer className="mt-16 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
          North Alabama Drone Applicators | Serving North Alabama agricultural
          operations.
        </footer>
      </main>
    </div>
  );
}
