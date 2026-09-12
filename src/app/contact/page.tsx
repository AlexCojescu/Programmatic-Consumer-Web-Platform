import dynamic from "next/dynamic";
import ContactHeader from "@/features/contact/components/contact-header";
import ContactFormMain from "@/features/contact/components/contact-form-main";
import ContactFooter from "@/features/contact/components/contact-footer";
import { DeferredMount } from "@/shared/ui/deferred-mount";

const CalendlyWidget = dynamic(
  () => import("@/features/contact/components/calendly-widget"),
  {
    loading: () => (
      <div className="h-[750px] w-full rounded-2xl bg-white/40 animate-pulse" aria-hidden="true" />
    ),
  }
);

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]">
      <ContactHeader />

      <div className="relative flex flex-col gap-0 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 pt-4 pb-8">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <ContactFormMain />
          </div>
        </div>

        <div
          id="contact-me"
          className="flex flex-col items-center justify-center gap-6 mt-16"
        >
          <div className="text-center max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Prefer to Schedule Directly?
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Book a consultation at your convenience. We&apos;ll discuss your technical requirements and explore how our solutions align with your business objectives.
            </p>
          </div>
          <div className="w-full max-w-4xl">
            <DeferredMount
              fallback={
                <div
                  className="h-[750px] w-full rounded-2xl bg-white/40 animate-pulse"
                  aria-hidden="true"
                />
              }
              rootMargin="480px"
            >
              <CalendlyWidget />
            </DeferredMount>
          </div>
        </div>
      </div>
      <ContactFooter />
    </div>
  );
}
