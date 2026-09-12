import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/features/shell/components/navbar";
import Footer from "@/features/shell/components/footer";
import AvailabilityToast from "@/features/shell/components/availability-toast";
import { SkipLink } from "@/shared/ui/skip-link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  title: "Programmatic | Systems Integration & Operational Engineering",
  description: "Transform operational chaos into predictable, scalable systems. We integrate your existing tools to reduce onboarding time by 40-60% and cut client dropoff without adding headcount.",
  metadataBase: new URL('https://www.programmatic-it.com'), 
  openGraph: {
    title: "Programmatic | Predictable Systems for Scalable Service Businesses",
    description: "We don't just add tools; we architect the operating backbone of your business. Seamlessly connect your CRM, Billing, and Ops for measurable growth.",
    url: 'https://www.programmatic-it.com', 
    siteName: 'Programmatic',
    images: [
      {
        url: '/programmatic-social-card.webp',
        width: 1200,
        height: 630,
        alt: 'Programmatic Systems Integration & Operations Architecture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  keywords: [
    "Systems Integration",
    "Operational Efficiency",
    "Workflow Optimization",
    "ISP Systems Architect",
    "SOP Automation",
    "Business Process Engineering",
    "Revenue Operations"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistSans.className} antialiased`}>
        <SkipLink />
        <Navbar />
        <div className="min-h-screen flex flex-col">
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
            <AvailabilityToast />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
