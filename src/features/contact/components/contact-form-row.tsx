import React from "react";

interface ContactFormRowProps {
  children: React.ReactNode;
}

/** Two-column responsive grid row for paired consultation-form fields. */
export const ContactFormRow: React.FC<ContactFormRowProps> = ({
  children,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
      {children}
    </div>
  );
};
