"use client";

import React from "react";

const LinkedInIcon = () => (
  <svg
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764S5.534 3.204 6.5 3.204 8.25 3.994 8.25 4.968 7.466 6.732 6.5 6.732zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
  </svg>
);

const ContactFooter: React.FC = () => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
            We read every note.
          </h3>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-[0.95rem]">
            Your message doesn’t drop into a generic inbox. It’s reviewed by the same team that
            designs and implements the systems—expect a thoughtful reply within one business day.
          </p>

          <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500 sm:text-[0.8rem]">
            <span>Prefer async?</span>
            <a
              href="https://www.linkedin.com/in/alexandrucojescu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-100"
            >
              <LinkedInIcon />
              <span className="underline underline-offset-2">Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFooter;
