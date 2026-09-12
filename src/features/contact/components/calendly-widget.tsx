"use client";

import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";

const CALENDLY_URL = "https://calendly.com/programmaticit/programmatic-it-com";

const CalendlyWidget = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="calendly-container h-[750px] w-full" aria-hidden="true" />;
  }

  return (
    <div className="calendly-container h-[750px] w-full">
      <InlineWidget
        url={CALENDLY_URL}
        styles={{
          height: "100%",
          width: "100%",
          minWidth: "320px",
        }}
        pageSettings={{
          backgroundColor: "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "00a2ff",
          textColor: "4d5055",
        }}
      />
    </div>
  );
};

export default CalendlyWidget;
