"use client";

import React from "react";

const ContactHeader: React.FC = () => {
  return (
    <section className="relative w-full">
      <div
        className="
          mx-auto flex max-w-5xl flex-col items-center
          px-4 sm:px-6 lg:px-8
          pt-40 sm:pt-44 lg:pt-48
          pb-2
        "
      >
        <div className="w-full rounded-3xl px-6 py-8 text-center sm:px-10 sm:py-10">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Contact · Systems Audit
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Schedule a{" "}
            <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              systems audit
            </span>
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-neutral-700 sm:text-base">
            Share how your NMS, billing, and CRM are wired today, plus where tickets get stuck.
            We’ll review your operation and send back a concrete recommendation on whether a full
            build makes sense—and what we’d tackle first.
          </p>

          <p className="mt-3 text-xs text-neutral-500 sm:text-[0.8rem]">
            No generic sales demo. You’ll leave with an opinionated view of your systems, even if
            we never work together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHeader;
