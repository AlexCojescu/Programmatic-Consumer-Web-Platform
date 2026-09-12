import dynamic from "next/dynamic";
import HeroSection from "@/features/home/components/hero-section";
import QuoteSection from "@/features/home/components/quote-section";
import { FadedGridBackground } from "@/shared/ui/faded-grid-background";
import { DeferredMount } from "@/shared/ui/deferred-mount";
import { HERO_MEDIA_REVISION } from "@/features/home/data/hero-slides";

function SectionSkeleton({ className }: { className: string }) {
  return (
    <div
      className={`rounded-2xl bg-white/40 animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

const ProcessSection = dynamic(
  () => import("@/features/home/components/process-section"),
  {
    loading: () => <SectionSkeleton className="min-h-[640px] w-full" />,
  }
);

const ServiceFilter = dynamic(
  () => import("@/features/home/components/enterprise-services-hub"),
  {
    loading: () => (
      <SectionSkeleton className="min-h-[650px] w-full max-w-6xl mx-auto" />
    ),
  }
);

const ContactHeader = dynamic(
  () => import("@/features/contact/components/contact-header"),
  {
    loading: () => <SectionSkeleton className="h-36 w-full max-w-4xl mx-auto" />,
  }
);

const ContactFormMain = dynamic(
  () => import("@/features/contact/components/contact-form-main"),
  {
    loading: () => <SectionSkeleton className="min-h-[520px] w-full" />,
  }
);

const CalendlyWidget = dynamic(
  () => import("@/features/contact/components/calendly-widget"),
  {
    loading: () => <SectionSkeleton className="h-[750px] w-full" />,
  }
);

const ContactFooter = dynamic(
  () => import("@/features/contact/components/contact-footer"),
  {
    loading: () => <SectionSkeleton className="h-28 w-full" />,
  }
);

export default function Page() {
  const posterVersion = HERO_MEDIA_REVISION;

  return (
    <div className="w-full">
      <link
        rel="preload"
        as="image"
        href={`/hero/slide-1-poster-1280.avif?v=${posterVersion}`}
        type="image/avif"
        fetchPriority="high"
        imageSrcSet={`/hero/slide-1-poster-800.avif?v=${posterVersion} 800w, /hero/slide-1-poster-1280.avif?v=${posterVersion} 1280w, /hero/slide-1-poster-1920.avif?v=${posterVersion} 1920w`}
        imageSizes="100vw"
      />
      <HeroSection />
      <QuoteSection />

      <div className="relative z-10 overflow-hidden bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]">
        <FadedGridBackground />

        <section className="relative py-16 lg:py-24">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <DeferredMount
              fallback={<SectionSkeleton className="min-h-[640px] w-full" />}
            >
              <ProcessSection />
            </DeferredMount>
          </div>
        </section>

        <DeferredMount
          fallback={
            <SectionSkeleton className="min-h-[650px] w-full max-w-6xl mx-auto" />
          }
        >
          <ServiceFilter />
        </DeferredMount>

        <DeferredMount
          fallback={<SectionSkeleton className="h-36 w-full max-w-4xl mx-auto" />}
        >
          <ContactHeader />
        </DeferredMount>

        <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-0 px-16 lg:px-32 xl:px-48 2xl:px-64">
          <div className="flex items-center justify-center py-4 lg:py-6 lg:pr-1">
            <div className="w-full max-w-none">
              <DeferredMount
                fallback={<SectionSkeleton className="min-h-[520px] w-full" />}
              >
                <ContactFormMain />
              </DeferredMount>
            </div>
          </div>

          <div
            id="contact-me"
            className="flex items-center justify-center py-4 lg:py-6 lg:pl-1"
          >
            <div className="w-full">
              <DeferredMount
                fallback={<SectionSkeleton className="h-[750px] w-full" />}
                rootMargin="480px"
              >
                <CalendlyWidget />
              </DeferredMount>
            </div>
          </div>
        </div>

        <DeferredMount fallback={<SectionSkeleton className="h-28 w-full" />}>
          <ContactFooter />
        </DeferredMount>
      </div>
    </div>
  );
}
