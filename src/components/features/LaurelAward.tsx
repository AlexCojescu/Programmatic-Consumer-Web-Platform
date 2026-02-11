import React from "react";

interface AwardProps {
  title: string;
  subtitle: string;
  description: string;
}

const LaurelAward: React.FC<AwardProps> = ({
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="flex items-center justify-center bg-transparent text-black font-sans py-4">
      <div
        className="
          relative
          flex
          items-center
          justify-center
          text-center
        "
        style={{
          // ~0.75 of the previous size
          width: "240px",
          height: "165px",
          backgroundImage: "url('/wreath.png')", // your transparent laurel
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <div className="flex flex-col items-center justify-center px-3 space-y-0.5">
          <h2 className="text-base font-semibold tracking-tight leading-snug">
            {title}
          </h2>
          <span className="text-[9px] font-medium uppercase tracking-[0.25em]">
            {subtitle}
          </span>
          <p className="mt-0.5 text-[9px] text-black/70 leading-snug italic">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LaurelAward;
