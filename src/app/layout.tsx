import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer, AvailabilityToast } from "@/features/shell";
import { SkipLink } from "@/shared/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        url: '/programmatic-social-card.png',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SkipLink />
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