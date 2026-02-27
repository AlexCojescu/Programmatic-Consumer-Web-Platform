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

      {/* Main content container */}
      <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-0 px-16 lg:px-32 xl:px-48 2xl:px-64">
        {/* Contact Form */}
        {/* To adjust vertical alignment: Change items-center to items-start (top) or items-end (bottom) */}
        {/* To adjust vertical padding: Change py-4 lg:py-6 (e.g., py-6 lg:py-8 for more, py-2 lg:py-4 for less) */}
        <div className="flex items-center justify-center py-4 lg:py-6 lg:pr-1">
          <div className="w-full max-w-none">
            <ContactFormMain />
          </div>
        </div>
        {/* Calendar Widget */}
        {/* To adjust vertical alignment: Change items-center to items-start (top) or items-end (bottom) */}
        {/* To adjust vertical padding: Change py-4 lg:py-6 (e.g., py-6 lg:py-8 for more, py-2 lg:py-4 for less) */}
        {/* To adjust Calendly height: Edit h-[850px] in CalendlyWidget.tsx component */}
        <div
          id="contact-me"
          className="flex items-center justify-center py-4 lg:py-6 lg:pl-1"
        >
          <div className="w-full">
            <CalendlyWidget />
          </div>
        </div>
        
      </div>
      <ContactFooter />

      <ChatbotWidget />

     
    </div>
  );
}