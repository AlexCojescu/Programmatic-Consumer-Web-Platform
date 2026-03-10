import Navbar from "@/components/features/Navbar";
import CalendlyWidget from "@/components/features/homepage/CalendlyWidget";
import ContactHeader from "@/components/features/ContactHeader";
import ContactFooter from "@/components/features/ContactFooter";

import ChatbotWidget from "../../components/chatbotui/chat-widget/page";
import ContactFormMain from "@/components/features/contactmemain";

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]">
      <Navbar />

      <ContactHeader />

      {/* Main content container - Stacked vertically */}
      <div className="relative flex flex-col gap-0 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 pt-4 pb-8">
        {/* Contact Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <ContactFormMain />
          </div>
        </div>

        {/* Calendar Widget Section */}
        <div
          id="contact-me"
          className="flex flex-col items-center justify-center gap-6 mt-16"
        >
          <div className="text-center max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Prefer to Schedule Directly?
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Book a consultation at your convenience. We'll discuss your technical requirements and explore how our solutions align with your business objectives.
            </p>
          </div>
          <div className="w-full max-w-4xl">
            <CalendlyWidget />
          </div>
        </div>
        
      </div>
      <ContactFooter />

      <ChatbotWidget />

     
    </div>
  );
}