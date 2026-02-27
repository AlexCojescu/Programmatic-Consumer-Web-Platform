"use client";

import React from "react";

const HowWeHelp: React.FC = () => {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-20 lg:py-24 space-y-8 sm:space-y-10">
        {/* Heading + intro */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            How We Help ISPs Scale Operations Reliably
          </h2>
          <p className="text-sm sm:text-lg text-slate-700 leading-relaxed">
            We partner with ISPs doing 50k+ MRR to turn fragmented
            operations into reliable, measurable systems. We are systems integrators;
            our work lives in the workflows, SOPs, and tools your
            teams already use every day.
          </p>
          <p className="text-sm sm:text-lg text-slate-700 leading-relaxed">
            Instead of layering on more software, we design and implement an operating
            backbone for your business: client onboarding, service delivery, support,
            and the internal handoffs between them. We map your processes, audit your
            tools, architect the right workflows, and train your teams—so your
            operation runs consistently, even as volume grows.
          </p>
        </div>

        {/* Problems + Outcomes in one block */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-3">
            <h3 className="text-base sm:text-xl font-semibold text-slate-900">
              ISPs work with us when:
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-slate-700 leading-relaxed text-xs sm:text-base">
              <li className="flex gap-2">
                <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>
                  Onboarding new customers takes too long and install dates slip.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>
                  Show rates, activations, and completion rates are inconsistent
                  across regions or teams.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>
                  Work orders, tickets, and documentation fall through the cracks
                  between systems.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>
                  Teams are stuck reconciling data between NMS, CRMs, billing, and
                  spreadsheets just to stay afloat.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>
                  Customers cancel before install due to slow or confusing
                  onboarding and support experiences.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>
                  Upgrade and cross‑sell opportunities are missed because data is
                  siloed across systems.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>
                  Leadership can’t see a clean link between operational KPIs and
                  revenue, churn, and margin.
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-base sm:text-xl font-semibold text-slate-900">
              What we improve inside your operation
            </h3>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div className="space-y-2.5 sm:space-y-3">
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wide">
                  Onboarding & Activations
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-slate-700 text-xs sm:text-sm leading-relaxed">
                  <li>Time to onboard new customers and schedule installs.</li>
                  <li>Time to first value (activation / first successful session).</li>
                  <li>Onboarding completion vs drop‑off rate by region or segment.</li>
                  <li>
                    Show rate for key calls and appointments (intake, site survey,
                    install).
                  </li>
                  <li>
                    Onboarding ticket volume, repeat issues, and satisfaction scores.
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wide">
                  Delivery, Support & Ops
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-slate-700 text-xs sm:text-sm leading-relaxed">
                  <li>Project / work‑order completion time across your footprint.</li>
                  <li>
                    Customer task completion rate (forms, agreements, prep steps).
                  </li>
                  <li>
                    Number of manual handoffs, rework loops, and “stuck” tickets.
                  </li>
                  <li>Frequency of fire‑drill escalations and truck rolls.</li>
                  <li>
                    Implementation cycle time (contract → go‑live) and time to
                    revenue.
                  </li>
                  <li>
                    Data accuracy and consistency between NMS, CRM, billing, and
                    support tools.
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              We benchmark these at the start and track them as we work together so
              you can see operational ROI in real numbers—not just vibes.
            </p>
          </div>
        </div>

        {/* Positioning line */}
        <div className="border-t border-slate-200 pt-6 sm:pt-8">
          <p className="text-xs sm:text-base text-slate-700 leading-relaxed max-w-3xl">
            Think of us as your behind‑the‑scenes operations partner for fiber and
            wireless ISPs: we connect your tools, standardize your processes, and give
            your teams a single, documented way to execute—so leadership can focus on
            expansion and network performance, not firefighting.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowWeHelp;
