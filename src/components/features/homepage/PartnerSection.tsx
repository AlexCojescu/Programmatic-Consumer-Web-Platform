"use client";
import Image from 'next/image';
import React from 'react';
import { IMAGE_SIZES } from '@/lib/image-sizes';

const PartnerSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 lg:px-6 bg-black-100 text-white-100">
      <div className="max-w-6xl mx-auto">
        <div className="md:grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="md:block">
            {/* Centered header (mobile only) */}
            <div className="md:hidden mb-6 sm:mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                Who you will partner with.
              </h2>
              <p className="text-base sm:text-lg text-white-200 px-2 leading-relaxed">
                We build trust, confidence, and security throughout our process.
              </p>
            </div>

            {/* Centered image (mobile only) */}
            <div className="flex justify-center md:hidden mb-6 sm:mb-8">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                <Image
                  src="/Creator.png"
                  alt="A portrait of Alex"
                  width={400}
                  height={400}
                  sizes={IMAGE_SIZES.partnerPortrait}
                  className="rounded-full object-cover w-full h-full shadow-lg ring-2 sm:ring-4 ring-offset-2 sm:ring-offset-4 ring-offset-black-100 ring-blue-100/90"
                  priority
                />
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Desktop header (hidden on mobile) */}
              <div className="hidden md:block">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 leading-tight">
                  Who you will partner with.
                </h2>
                <p className="text-lg mb-6 lg:mb-8 text-white-200 leading-relaxed">
                  We build trust, confidence, and security throughout our process.
                </p>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold leading-tight ">
                Hello, my name is Alex.
                <br />
                <span className="text-purple">
                  I am a software engineer, techpreneur, &amp; your partner.
                </span>
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-white-200 px-1 sm:px-0">
                With over 6 years of experience in software development and design, I excel as a leading
                software engineer with a specialization in software automation. Having serviced 50+ clients
                with transactions exceeding $200,000, I&apos;m ready to create a personalized software solution for
                you. Got a design, software, or website in mind? Let&apos;s create it!
              </p>

              {/* Centered button (mobile only) */}
              <div className="flex justify-center md:block pt-2 sm:pt-4">
                <a
                  href="https://alexandrucojescu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-center font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition bg-[#e6f0ff] text-black-100 hover:bg-[#e6f0ff]/90 text-sm sm:text-base touch-manipulation"
                >
                  Learn More!
                </a>
              </div>
            </div>
          </div>

          {/* Desktop image column (unchanged for desktop, optimized for larger screens) */}
          <div className="hidden md:flex justify-end items-center w-full h-full min-h-[400px] lg:min-h-[500px]">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <Image
                src="/Creator.png"
                alt="A portrait of Alex"
                width={400}
                height={400}
                sizes={IMAGE_SIZES.partnerPortrait}
                className="rounded-full object-cover w-full h-full shadow-lg ring-4 ring-offset-4 ring-offset-black-100 ring-blue-100/90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;