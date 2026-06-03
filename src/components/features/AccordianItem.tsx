"use client"; // This component will need client-side interactivity

import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for combining class names

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionItem = ({ title, children, className }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={cn("border-b border-gray-200 py-4", className)}>
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-medium text-gray-800">{title}</h3>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 45 : 0 }} // Rotate for plus (+) to x (X) effect
          transition={{ duration: 0.2 }}
        >
          {/* Simple plus/minus icon using SVG or text */}
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: "1rem" },
              collapsed: { opacity: 0, height: 0, marginTop: "0rem" },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden text-gray-600 text-base"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};