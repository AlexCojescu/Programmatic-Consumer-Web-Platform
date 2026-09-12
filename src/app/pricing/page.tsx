import PricingOneLinerHero from "@/features/pricing/components/pricing-one-liner-hero";
import OperationalAudit from "@/features/pricing/components/operational-audit";
import TieredArchitecture from "@/features/pricing/components/tsa";
import ComplexityMatrix from "@/features/pricing/components/complexity-matrix";
import InvestmentPaths from "@/features/pricing/components/investment-paths";
import PartnerProgram from "@/features/pricing/components/partner-program";
import { FadedGridBackground } from "@/shared/ui/faded-grid-background";

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_white_0%,_white_40%,_#EFF6FF_60%,_#DBEAFE_100%)]" />
      <FadedGridBackground />

      <div className="pt-16 sm:pt-20 lg:pt-24 xl:pt-32">
        <PricingOneLinerHero />
        <OperationalAudit />
        <TieredArchitecture />
        <ComplexityMatrix />
        <InvestmentPaths />
        <PartnerProgram />
      </div>
    </div>
  );
}
