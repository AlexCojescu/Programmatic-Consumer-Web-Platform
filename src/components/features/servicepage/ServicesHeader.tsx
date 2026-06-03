"use client";

import React from "react";
import { motion, type Variants } from "motion/react";

const serviceLinks = [
  { name: "Revenue OS", href: "#ai-solutions", isFeatured: true },
  { name: "Client Onboarding", href: "#data-architecture", isFeatured: true },
  { name: "Fulfillment & Delivery", href: "#apps", isFeatured: true },
  { name: "Tool & Data Integration", href: "#automation", isFeatured: true },
  { name: "SOP Design", href: "#digital-strategy", isFeatured: true },
  {
    name: "KPI Dashboards & Reporting",
    href: "#enterprise-transformation",
    isFeatured: true,
  },
  { name: "Client Success", href: "#performance-tech", isFeatured: true },
  { name: "Retention Ops", href: "#web-design", isFeatured: true },
  { name: "Ongoing Ops Management", href: "#web-development", isFeatured: true },
  { name: "Process Mapping", href: "#web-development", isFeatured: true },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const ServicesHeader = () => {
  return (
    <div className="pt-14 sm:pt-20 lg:pt-24 xl:pt-40">
      <motion.header
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="pt-28 sm:pt-48 pb-0 px-4 sm:px-20 lg:px-64 xl:px-80">
          {/* Main "Services" Title */}
          <motion.h1
  variants={itemVariants}
  className="text-4xl sm:text-8xl lg:text-8xl font-light text-gray-900 tracking-tight sm:tracking-tighter leading-snug sm:leading-[1.05]"
>
  Operational systems for serious operators, <br className="sm:hidden" />Not AI theatre
</motion.h1>



          {/* Navigation Links Container */}
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 sm:mt-16"
          >
            <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-5">
              {serviceLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={itemVariants}
                  className={`text-sm sm:text-2xl text-gray-500 hover:text-gray-900 transition-colors duration-300 relative group
                    ${link.isFeatured ? "font-medium text-gray-800" : ""}
                  `}
                >
                  <span>{link.name}</span>
                  {link.isFeatured && (
                    <span className="absolute bottom-[-4px] left-0 w-full h-px bg-gray-400" />
                  )}
                  {!link.isFeatured && (
                    <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-gray-500 transition-all duration-300 group-hover:w-full" />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        </div>
      </motion.header>
    </div>
  );
};

export default ServicesHeader;
