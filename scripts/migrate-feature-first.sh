#!/usr/bin/env bash
# History-preserving feature-first migration.
# Usage: ./scripts/migrate-feature-first.sh <1|2|3|all>
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

PHASE="${1:-all}"

log() { printf '\n==> %s\n' "$*"; }

track_mv() {
  local src="$1"
  local dest="$2"

  if [[ -e "$dest" ]]; then
    printf 'skip (exists) %s\n' "$dest"
    return 0
  fi
  if [[ ! -e "$src" ]]; then
    printf 'warn skip missing %s\n' "$src"
    return 0
  fi

  mkdir -p "$(dirname "$dest")"

  if git ls-files --error-unmatch "$src" >/dev/null 2>&1; then
    git mv "$src" "$dest"
  else
    git add -- "$src"
    git mv "$src" "$dest"
  fi
}

phase1() {
  log "Phase 1: create target directories and barrel stubs"

  mkdir -p \
    src/core/env \
    src/core/security \
    src/shared/lib \
    src/shared/hooks \
    src/shared/ui \
    src/shared/layouts \
    src/shared/motion \
    src/features/shell/components \
    src/features/home/components \
    src/features/home/data \
    src/features/home/styles \
    src/features/about/components \
    src/features/services/components \
    src/features/pricing/components \
    src/features/contact/components \
    src/features/contact/schemas \
    src/features/contact/api \
    src/features/_legacy \
    scripts

  local barrel
  for barrel in \
    src/core/index.ts \
    src/core/env/index.ts \
    src/core/security/index.ts \
    src/shared/index.ts \
    src/shared/ui/index.ts \
    src/shared/layouts/index.ts \
    src/shared/motion/index.ts \
    src/shared/hooks/index.ts \
    src/features/shell/index.ts \
    src/features/home/index.ts \
    src/features/about/index.ts \
    src/features/services/index.ts \
    src/features/pricing/index.ts \
    src/features/contact/index.ts
  do
    if [[ ! -f "$barrel" ]]; then
      printf 'export {};\n' > "$barrel"
    fi
  done

  git add src/core src/shared src/features scripts/migrate-feature-first.sh
  echo "Phase 1 complete."
}

phase2() {
  log "Phase 2: git mv modules into feature-first layout"

  # --- core ---
  track_mv src/lib/env.ts              src/core/env/env.ts
  track_mv src/lib/security-headers.ts src/core/security/security-headers.ts
  track_mv src/lib/rate-limit.ts       src/core/security/rate-limit.ts
  track_mv src/lib/html-escape.ts      src/core/security/html-escape.ts

  # --- shared ---
  track_mv src/lib/utils.ts       src/shared/lib/utils.ts
  track_mv src/lib/image-sizes.ts src/shared/lib/image-sizes.ts

  track_mv src/components/ui/button.tsx              src/shared/ui/button.tsx
  track_mv src/components/ui/check-list.tsx          src/shared/ui/check-list.tsx
  track_mv src/components/ui/green-check-list.tsx    src/shared/ui/green-check-list.tsx
  track_mv src/components/ui/cta-button.tsx          src/shared/ui/cta-button.tsx
  track_mv src/components/ui/cta-panel.tsx           src/shared/ui/cta-panel.tsx
  track_mv src/components/ui/deferred-mount.tsx      src/shared/ui/deferred-mount.tsx
  track_mv src/components/ui/eyebrow.tsx             src/shared/ui/eyebrow.tsx
  track_mv src/components/ui/FadedGridBackground.tsx src/shared/ui/faded-grid-background.tsx
  track_mv src/components/ui/glass-card.tsx          src/shared/ui/glass-card.tsx
  track_mv src/components/ui/grid-background.tsx     src/shared/ui/grid-background.tsx
  track_mv src/components/ui/popular-pill.tsx        src/shared/ui/popular-pill.tsx
  track_mv src/components/ui/section-heading.tsx     src/shared/ui/section-heading.tsx
  track_mv src/components/ui/section-intro.tsx       src/shared/ui/section-intro.tsx
  track_mv src/components/ui/line-chart.tsx          src/shared/ui/line-chart.tsx
  track_mv src/components/ui/skip-link.tsx           src/shared/ui/skip-link.tsx
  track_mv src/components/ui/responsive-picture.tsx  src/shared/ui/responsive-picture.tsx

  track_mv src/components/contactui/form.tsx     src/shared/ui/form.tsx
  track_mv src/components/contactui/input.tsx    src/shared/ui/input.tsx
  track_mv src/components/contactui/textarea.tsx src/shared/ui/textarea.tsx
  track_mv src/components/contactui/label.tsx    src/shared/ui/label.tsx
  track_mv src/components/contactui/card.tsx     src/shared/ui/card.tsx
  track_mv src/components/contactui/button.tsx   src/features/_legacy/contactui-button.tsx

  track_mv src/components/layouts/section-shell.tsx         src/shared/layouts/section-shell.tsx
  track_mv src/components/layouts/split-columns.tsx         src/shared/layouts/split-columns.tsx
  track_mv src/components/layouts/content-media-columns.tsx src/shared/layouts/content-media-columns.tsx
  track_mv src/components/layouts/content-section.tsx       src/shared/layouts/content-section.tsx
  track_mv src/components/layouts/glass-section-frame.tsx   src/shared/layouts/glass-section-frame.tsx

  track_mv src/components/features/aboutuspage/Animated-Beam.tsx src/shared/motion/animated-beam.tsx
  track_mv src/components/magicui/animated-list.tsx              src/shared/motion/animated-list.tsx
  track_mv src/components/magicui/Highlighter.tsx                src/shared/motion/highlighter.tsx

  # --- shell ---
  track_mv src/components/features/Navbar.tsx                  src/features/shell/components/navbar.tsx
  track_mv src/components/ui/navbar-underline-link.tsx         src/features/shell/components/navbar-underline-link.tsx
  track_mv src/components/ui/navbar-mobile-link.tsx            src/features/shell/components/navbar-mobile-link.tsx
  track_mv src/components/features/Footer.tsx                  src/features/shell/components/footer.tsx
  track_mv src/components/ui/footer-link-column.tsx            src/features/shell/components/footer-link-column.tsx
  track_mv src/components/ui/footer-nav-link.tsx               src/features/shell/components/footer-nav-link.tsx
  track_mv src/components/ui/footer-legal-link.tsx             src/features/shell/components/footer-legal-link.tsx
  track_mv src/components/ui/footer-social-link.tsx            src/features/shell/components/footer-social-link.tsx
  track_mv src/components/ui/footer-contact-row.tsx            src/features/shell/components/footer-contact-row.tsx
  track_mv src/components/features/AvailibilityToast.tsx       src/features/shell/components/availability-toast.tsx
  track_mv src/components/layouts/availability-toast-shell.tsx src/features/shell/components/availability-toast-shell.tsx
  track_mv src/components/ui/availability-live-dot.tsx         src/features/shell/components/availability-live-dot.tsx

  # --- home ---
  track_mv src/lib/hero-slides.ts src/features/home/data/hero-slides.ts
  track_mv src/components/features/homepage/SCS.module.css src/features/home/styles/scs.module.css
  track_mv src/components/features/homepage/HeroMediaCarousel.module.css src/features/home/styles/hero-media-carousel.module.css
  track_mv src/components/features/homepage/EnterpriseServicesHub.module.css src/features/home/styles/enterprise-services-hub.module.css
  track_mv src/components/features/homepage/BunnyVideoPlayer.module.css src/features/home/styles/bunny-video-player.module.css

  track_mv src/components/features/homepage/HeroSection.tsx        src/features/home/components/hero-section.tsx
  track_mv src/components/features/homepage/HeroMediaCarousel.tsx  src/features/home/components/hero-media-carousel.tsx
  track_mv src/components/ui/hero-carousel-slide.tsx               src/features/home/components/hero-carousel-slide.tsx
  track_mv src/components/ui/hero-carousel-controls.tsx            src/features/home/components/hero-carousel-controls.tsx
  track_mv src/components/features/homepage/QuoteSection.tsx       src/features/home/components/quote-section.tsx
  track_mv src/components/ui/wreath-badge.tsx                      src/features/home/components/wreath-badge.tsx
  track_mv src/components/features/homepage/ProcessSection.tsx     src/features/home/components/process-section.tsx
  track_mv src/components/layouts/home-process-columns.tsx         src/features/home/components/home-process-columns.tsx
  track_mv src/components/ui/home-process-heading.tsx              src/features/home/components/home-process-heading.tsx
  track_mv src/components/ui/home-process-cta-button.tsx           src/features/home/components/home-process-cta-button.tsx
  track_mv src/components/ui/home-service-backdrop.tsx             src/features/home/components/home-service-backdrop.tsx
  track_mv src/components/ui/home-service-modal.tsx                src/features/home/components/home-service-modal.tsx
  track_mv src/components/ui/home-service-spotlight-card.tsx       src/features/home/components/home-service-spotlight-card.tsx
  track_mv src/components/features/homepage/Service-filter.tsx     src/features/home/components/enterprise-services-hub.tsx
  track_mv src/components/layouts/enterprise-hero-shell.tsx        src/features/home/components/enterprise-hero-shell.tsx
  track_mv src/components/ui/enterprise-service-tab.tsx            src/features/home/components/enterprise-service-tab.tsx
  track_mv src/components/features/homepage/SCS01.tsx              src/features/home/components/scs-01.tsx
  track_mv src/components/features/homepage/SCS03.tsx              src/features/home/components/scs-03.tsx
  track_mv src/components/features/homepage/SCS04.tsx              src/features/home/components/scs-04.tsx
  track_mv src/components/layouts/scs-panel-shell.tsx              src/features/home/components/scs-panel-shell.tsx
  track_mv src/components/ui/scs-panel-image.tsx                   src/features/home/components/scs-panel-image.tsx
  track_mv src/components/ui/scs-panel-intro.tsx                   src/features/home/components/scs-panel-intro.tsx
  track_mv src/components/ui/scs-learn-more-button.tsx             src/features/home/components/scs-learn-more-button.tsx
  track_mv src/components/ui/scs-content-block.tsx                 src/features/home/components/scs-content-block.tsx
  track_mv src/components/layouts/split-showcase-card.tsx          src/features/home/components/split-showcase-card.tsx

  # --- about ---
  track_mv src/components/features/aboutuspage/AboutHeader.tsx src/features/about/components/about-header.tsx
  track_mv src/components/features/aboutuspage/AboutHub.tsx    src/features/about/components/about-hub.tsx
  track_mv src/components/layouts/about-hero-columns.tsx       src/features/about/components/about-hero-columns.tsx
  track_mv src/components/ui/BotDetection.tsx                  src/features/about/components/bot-detection.tsx
  track_mv src/components/ui/principle-card-grid.tsx           src/features/about/components/principle-card-grid.tsx
  track_mv src/components/ui/step-timeline.tsx                 src/features/about/components/step-timeline.tsx
  track_mv src/components/magicui/animated-beam.tsx            src/features/about/components/animated-beam-demo.tsx

  # --- services ---
  track_mv src/components/features/servicepage/ServicesHeader.tsx  src/features/services/components/services-header.tsx
  track_mv src/components/ui/service-nav-link.tsx                  src/features/services/components/service-nav-link.tsx
  track_mv src/components/features/servicepage/HowWeHelp.tsx       src/features/services/components/how-we-help.tsx
  track_mv src/components/layouts/service-content-shell.tsx        src/features/services/components/service-content-shell.tsx
  track_mv src/components/ui/service-bullet-list.tsx               src/features/services/components/service-bullet-list.tsx
  track_mv src/components/ui/service-metric-column.tsx             src/features/services/components/service-metric-column.tsx
  track_mv src/components/features/servicepage/ServiceTimeline.tsx src/features/services/components/service-timeline.tsx
  track_mv src/components/ui/service-timeline-rail.tsx             src/features/services/components/service-timeline-rail.tsx
  track_mv src/components/ui/service-stage-card.tsx                src/features/services/components/service-stage-card.tsx
  track_mv src/components/features/servicepage/WebDev.tsx          src/features/services/components/web-dev.tsx
  track_mv src/components/features/servicepage/SFAQ.tsx            src/features/services/components/sfaq.tsx
  track_mv src/components/ui/service-faq-card.tsx                  src/features/services/components/service-faq-card.tsx
  track_mv src/components/ui/service-offer-card.tsx                src/features/services/components/service-offer-card.tsx
  track_mv src/components/ui/service-impact-card.tsx               src/features/services/components/service-impact-card.tsx
  track_mv src/components/ui/service-impact-modal.tsx              src/features/services/components/service-impact-modal.tsx

  # --- pricing ---
  track_mv src/components/features/pricespages/PricingOneLinerHero.tsx      src/features/pricing/components/pricing-one-liner-hero.tsx
  track_mv src/components/features/pricespages/OperationalAudit.tsx         src/features/pricing/components/operational-audit.tsx
  track_mv src/components/ui/operational-guarantee-banner.tsx               src/features/pricing/components/operational-guarantee-banner.tsx
  track_mv src/components/features/pricespages/TSA.tsx                      src/features/pricing/components/tsa.tsx
  track_mv src/components/features/pricespages/ComplexityMatrix.tsx         src/features/pricing/components/complexity-matrix.tsx
  track_mv src/components/ui/complexity-lever-grid.tsx                      src/features/pricing/components/complexity-lever-grid.tsx
  track_mv src/components/features/pricespages/InvestmentPaths.tsx          src/features/pricing/components/investment-paths.tsx
  track_mv src/components/ui/investment-path-card.tsx                       src/features/pricing/components/investment-path-card.tsx
  track_mv src/components/features/pricespages/PartnerProgram.tsx           src/features/pricing/components/partner-program.tsx
  track_mv src/components/ui/partner-benefit.tsx                            src/features/pricing/components/partner-benefit.tsx
  track_mv src/components/ui/partner-portrait-image.tsx                     src/features/pricing/components/partner-portrait-image.tsx
  track_mv src/components/features/pricespages/WebDevPricingSection.tsx     src/features/pricing/components/web-dev-pricing-section.tsx
  track_mv src/components/features/pricespages/AutomationPricingSection.tsx src/features/pricing/components/automation-pricing-section.tsx
  track_mv src/components/features/pricespages/LeadGenPricingSection.tsx    src/features/pricing/components/lead-gen-pricing-section.tsx
  track_mv src/components/features/pricespages/AIContentPricingSection.tsx  src/features/pricing/components/ai-content-pricing-section.tsx
  track_mv src/components/layouts/glass-pricing-frame.tsx                   src/features/pricing/components/glass-pricing-frame.tsx
  track_mv src/components/layouts/pricing-section-band.tsx                  src/features/pricing/components/pricing-section-band.tsx
  track_mv src/components/ui/pricing-section-header.tsx                     src/features/pricing/components/pricing-section-header.tsx
  track_mv src/components/ui/pricing-centered-header.tsx                    src/features/pricing/components/pricing-centered-header.tsx
  track_mv src/components/ui/pricing-eyebrow.tsx                            src/features/pricing/components/pricing-eyebrow.tsx
  track_mv src/components/ui/pricing-tier-card.tsx                          src/features/pricing/components/pricing-tier-card.tsx
  track_mv src/components/ui/pricing-plan-card.tsx                          src/features/pricing/components/pricing-plan-card.tsx
  track_mv src/components/ui/pricing-plan-header.tsx                        src/features/pricing/components/pricing-plan-header.tsx
  track_mv src/components/ui/pricing-feature-list.tsx                       src/features/pricing/components/pricing-feature-list.tsx
  track_mv src/components/ui/pricing-check-icon.tsx                         src/features/pricing/components/pricing-check-icon.tsx
  track_mv src/components/ui/pricing-process-steps.tsx                      src/features/pricing/components/pricing-process-steps.tsx
  track_mv src/components/ui/pricing-tech-stack.tsx                         src/features/pricing/components/pricing-tech-stack.tsx
  track_mv src/components/ui/pricing-cta-panel.tsx                          src/features/pricing/components/pricing-cta-panel.tsx
  track_mv src/components/ui/service-tier-card.tsx                          src/features/pricing/components/service-tier-card.tsx
  track_mv src/components/ui/retainer-plan-card.tsx                         src/features/pricing/components/retainer-plan-card.tsx
  track_mv src/components/ui/tech-logo-panel.tsx                            src/features/pricing/components/tech-logo-panel.tsx

  # --- contact ---
  track_mv src/lib/schemas.ts                                  src/features/contact/schemas/contact.schema.ts
  track_mv src/lib/schemasmain.ts                              src/features/contact/schemas/consultation.schema.ts
  track_mv src/lib/email.ts                                    src/features/contact/api/send-email.ts
  track_mv src/components/features/ContactHeader.tsx           src/features/contact/components/contact-header.tsx
  track_mv src/components/features/ContactFooter.tsx           src/features/contact/components/contact-footer.tsx
  track_mv src/components/features/contactmemain.tsx           src/features/contact/components/contact-form-main.tsx
  track_mv src/components/layouts/contact-form-row.tsx         src/features/contact/components/contact-form-row.tsx
  track_mv src/components/ui/contact-text-field.tsx            src/features/contact/components/contact-text-field.tsx
  track_mv src/components/ui/floating-label-field.tsx          src/features/contact/components/floating-label-field.tsx
  track_mv src/components/features/homepage/CalendlyWidget.tsx src/features/contact/components/calendly-widget.tsx

  # --- quarantine unused ---
  track_mv src/components/features/contactme.tsx                  src/features/_legacy/contact-form-simple.tsx
  track_mv src/components/features/pricespages/PricingSection.tsx src/features/_legacy/pricing-section.tsx
  track_mv src/components/features/homepage/SCS02.tsx             src/features/_legacy/scs-02.tsx
  track_mv src/components/features/homepage/SCS05.tsx             src/features/_legacy/scs-05.tsx
  track_mv src/components/features/homepage/PartnerSection.tsx    src/features/_legacy/partner-section.tsx
  track_mv src/components/features/homepage/AnimatedList.tsx      src/features/_legacy/animated-list-demo.tsx
  track_mv src/components/features/homepage/BunnyVideoPlayer.js   src/features/_legacy/bunny-video-player.js
  track_mv src/components/features/AIServicesSection.tsx          src/features/_legacy/ai-services-section.tsx
  track_mv src/components/features/SalesSection.tsx               src/features/_legacy/sales-section.tsx
  track_mv src/components/features/ServicesSection.tsx            src/features/_legacy/services-section.tsx
  track_mv src/components/features/AccordianItem.tsx              src/features/_legacy/accordion-item.tsx
  track_mv src/components/features/WorkflowSection.tsx            src/features/_legacy/workflow-section.tsx
  track_mv src/components/features/CalmImageSection.tsx           src/features/_legacy/calm-image-section.tsx
  track_mv src/components/features/LaurelAward.tsx                src/features/_legacy/laurel-award.tsx
  track_mv src/components/features/Seperator.tsx                  src/features/_legacy/separator.tsx
  track_mv src/components/ui/3d-pin.tsx                           src/features/_legacy/3d-pin.tsx
  track_mv src/components/ui/world-map.tsx                        src/features/_legacy/world-map.tsx
  track_mv src/components/ui/Timeline.tsx                         src/features/_legacy/timeline.tsx
  track_mv src/components/ui/onboard-card.tsx                     src/features/_legacy/onboard-card.tsx
  track_mv src/components/contactui/email-template.tsx            src/features/_legacy/email-template.tsx
  track_mv src/components/contactui/navigation-menu.tsx           src/features/_legacy/navigation-menu.tsx
  track_mv src/components/contactui/pointer-highlight.tsx         src/features/_legacy/pointer-highlight.tsx
  track_mv src/components/magicui/typing-animation.tsx            src/features/_legacy/typing-animation.tsx
  track_mv src/components/magicui/bento-grid.tsx                  src/features/_legacy/bento-grid.tsx
  track_mv src/components/magicui/animated-tabs.tsx               src/features/_legacy/animated-tabs.tsx
  track_mv src/components/ui/sales-feature-item.tsx               src/features/_legacy/sales-feature-item.tsx
  track_mv src/components/ui/process-steps-panel.tsx              src/features/_legacy/process-steps-panel.tsx
  track_mv src/components/ui/home-notification-card.tsx           src/features/_legacy/home-notification-card.tsx

  echo "Phase 2 complete."
}

phase3() {
  log "Phase 3: mechanical import rewrites"

  python3 - <<'PY'
from pathlib import Path

ROOT = Path(".")
REPLACEMENTS = [
    ("@/components/features/homepage/SCS.module.css", "@/features/home/styles/scs.module.css"),
    ("@/components/features/homepage/HeroMediaCarousel.module.css", "@/features/home/styles/hero-media-carousel.module.css"),
    ("@/components/features/homepage/EnterpriseServicesHub.module.css", "@/features/home/styles/enterprise-services-hub.module.css"),
    ("@/lib/hero-slides", "@/features/home/data/hero-slides"),
    ("@/lib/email", "@/features/contact/api/send-email"),
    ("@/lib/schemasmain", "@/features/contact/schemas/consultation.schema"),
    ("@/lib/schemas", "@/features/contact/schemas/contact.schema"),
    ("@/lib/env", "@/core/env/env"),
    ("@/lib/rate-limit", "@/core/security/rate-limit"),
    ("@/lib/html-escape", "@/core/security/html-escape"),
    ("@/lib/security-headers", "@/core/security/security-headers"),
    ("@/lib/utils", "@/shared/lib/utils"),
    ("@/lib/image-sizes", "@/shared/lib/image-sizes"),
    ("@/components/contactui/form", "@/shared/ui/form"),
    ("@/components/contactui/input", "@/shared/ui/input"),
    ("@/components/contactui/textarea", "@/shared/ui/textarea"),
    ("@/components/contactui/label", "@/shared/ui/label"),
    ("@/components/contactui/card", "@/shared/ui/card"),
    ("@/components/contactui/button", "@/shared/ui/button"),
    ("@/components/ui/FadedGridBackground", "@/shared/ui/faded-grid-background"),
    ("@/components/ui/skip-link", "@/shared/ui/skip-link"),
    ("@/components/ui/responsive-picture", "@/shared/ui/responsive-picture"),
    ("@/components/ui/deferred-mount", "@/shared/ui/deferred-mount"),
    ("@/components/ui/button", "@/shared/ui/button"),
    ("@/components/magicui/animated-beam", "@/features/about/components/animated-beam-demo"),
    ("@/components/magicui/animated-list", "@/shared/motion/animated-list"),
    ("@/components/magicui/Highlighter", "@/shared/motion/highlighter"),
    ("@/components/features/aboutuspage/Animated-Beam", "@/shared/motion/animated-beam"),
    ("@/components/features/Navbar", "@/features/shell/components/navbar"),
    ("@/components/features/Footer", "@/features/shell/components/footer"),
    ("@/components/features/AvailibilityToast", "@/features/shell/components/availability-toast"),
    ("@/components/features/contactmemain", "@/features/contact/components/contact-form-main"),
    ("@/components/features/ContactHeader", "@/features/contact/components/contact-header"),
    ("@/components/features/ContactFooter", "@/features/contact/components/contact-footer"),
    ("@/components/features/homepage/CalendlyWidget", "@/features/contact/components/calendly-widget"),
    ("@/components/features/homepage/HeroSection", "@/features/home/components/hero-section"),
    ("@/components/features/homepage/QuoteSection", "@/features/home/components/quote-section"),
    ("@/components/features/homepage/ProcessSection", "@/features/home/components/process-section"),
    ("@/components/features/homepage/Service-filter", "@/features/home/components/enterprise-services-hub"),
    ("@/components/features/aboutuspage/AboutHeader", "@/features/about/components/about-header"),
    ("@/components/features/aboutuspage/AboutHub", "@/features/about/components/about-hub"),
    ("@/components/features/servicepage/ServicesHeader", "@/features/services/components/services-header"),
    ("@/components/features/servicepage/HowWeHelp", "@/features/services/components/how-we-help"),
    ("@/components/features/servicepage/ServiceTimeline", "@/features/services/components/service-timeline"),
    ("@/components/features/servicepage/SFAQ", "@/features/services/components/sfaq"),
    ("@/components/features/servicepage/WebDev", "@/features/services/components/web-dev"),
    ("@/components/features/pricespages/PricingOneLinerHero", "@/features/pricing/components/pricing-one-liner-hero"),
    ("@/components/features/pricespages/OperationalAudit", "@/features/pricing/components/operational-audit"),
    ("@/components/features/pricespages/TSA", "@/features/pricing/components/tsa"),
    ("@/components/features/pricespages/ComplexityMatrix", "@/features/pricing/components/complexity-matrix"),
    ("@/components/features/pricespages/InvestmentPaths", "@/features/pricing/components/investment-paths"),
    ("@/components/features/pricespages/PartnerProgram", "@/features/pricing/components/partner-program"),
    ("@/components/features/pricespages/WebDevPricingSection", "@/features/pricing/components/web-dev-pricing-section"),
    ("@/components/features/pricespages/AutomationPricingSection", "@/features/pricing/components/automation-pricing-section"),
    ("@/components/features/pricespages/LeadGenPricingSection", "@/features/pricing/components/lead-gen-pricing-section"),
    ("@/components/features/pricespages/AIContentPricingSection", "@/features/pricing/components/ai-content-pricing-section"),
    ("@/components/layouts/section-shell", "@/shared/layouts/section-shell"),
    ("@/components/layouts/split-columns", "@/shared/layouts/split-columns"),
    ("@/components/layouts/content-media-columns", "@/shared/layouts/content-media-columns"),
    ("@/components/layouts/content-section", "@/shared/layouts/content-section"),
    ("@/components/layouts/glass-section-frame", "@/shared/layouts/glass-section-frame"),
    ("@/components/layouts/about-hero-columns", "@/features/about/components/about-hero-columns"),
    ("@/components/layouts/availability-toast-shell", "@/features/shell/components/availability-toast-shell"),
    ("@/components/layouts/contact-form-row", "@/features/contact/components/contact-form-row"),
    ("@/components/layouts/enterprise-hero-shell", "@/features/home/components/enterprise-hero-shell"),
    ("@/components/layouts/glass-pricing-frame", "@/features/pricing/components/glass-pricing-frame"),
    ("@/components/layouts/home-process-columns", "@/features/home/components/home-process-columns"),
    ("@/components/layouts/pricing-section-band", "@/features/pricing/components/pricing-section-band"),
    ("@/components/layouts/scs-panel-shell", "@/features/home/components/scs-panel-shell"),
    ("@/components/layouts/service-content-shell", "@/features/services/components/service-content-shell"),
    ("@/components/layouts/split-showcase-card", "@/features/home/components/split-showcase-card"),
    ("@/components/ui/grid-background", "@/shared/ui/grid-background"),
    ("@/components/ui/section-intro", "@/shared/ui/section-intro"),
    ("@/components/ui/section-heading", "@/shared/ui/section-heading"),
    ("@/components/ui/check-list", "@/shared/ui/check-list"),
    ("@/components/ui/cta-button", "@/shared/ui/cta-button"),
    ("@/components/ui/principle-card-grid", "@/features/about/components/principle-card-grid"),
    ("@/components/ui/step-timeline", "@/features/about/components/step-timeline"),
    ("@/components/ui/BotDetection", "@/features/about/components/bot-detection"),
    ("@/components/ui/pricing-eyebrow", "@/features/pricing/components/pricing-eyebrow"),
    ("@/components/ui/service-tier-card", "@/features/pricing/components/service-tier-card"),
    ("@/components/ui/floating-label-field", "@/features/contact/components/floating-label-field"),
    ("@/components/ui/contact-text-field", "@/features/contact/components/contact-text-field"),
    ("@/components/ui/enterprise-service-tab", "@/features/home/components/enterprise-service-tab"),
    ("@/components/ui/hero-carousel-controls", "@/features/home/components/hero-carousel-controls"),
    ("@/components/ui/hero-carousel-slide", "@/features/home/components/hero-carousel-slide"),
    ("@/components/ui/scs-panel-image", "@/features/home/components/scs-panel-image"),
    ("@/components/ui/scs-panel-intro", "@/features/home/components/scs-panel-intro"),
    ("@/components/ui/scs-learn-more-button", "@/features/home/components/scs-learn-more-button"),
    ("@/components/ui/scs-content-block", "@/features/home/components/scs-content-block"),
    ("@/components/ui/pricing-tier-card", "@/features/pricing/components/pricing-tier-card"),
    ("@/components/ui/pricing-feature-list", "@/features/pricing/components/pricing-feature-list"),
    ("@/components/ui/retainer-plan-card", "@/features/pricing/components/retainer-plan-card"),
    ("@/components/ui/home-process-heading", "@/features/home/components/home-process-heading"),
    ("@/components/ui/home-process-cta-button", "@/features/home/components/home-process-cta-button"),
    ("@/components/ui/home-service-backdrop", "@/features/home/components/home-service-backdrop"),
    ("@/components/ui/home-service-modal", "@/features/home/components/home-service-modal"),
    ("@/components/ui/home-service-spotlight-card", "@/features/home/components/home-service-spotlight-card"),
    ("@/components/ui/complexity-lever-grid", "@/features/pricing/components/complexity-lever-grid"),
    ("@/components/ui/operational-guarantee-banner", "@/features/pricing/components/operational-guarantee-banner"),
    ("@/components/ui/pricing-section-header", "@/features/pricing/components/pricing-section-header"),
    ("@/components/ui/pricing-tech-stack", "@/features/pricing/components/pricing-tech-stack"),
    ("@/components/ui/pricing-cta-panel", "@/features/pricing/components/pricing-cta-panel"),
    ("@/components/ui/pricing-process-steps", "@/features/pricing/components/pricing-process-steps"),
    ("@/components/ui/pricing-centered-header", "@/features/pricing/components/pricing-centered-header"),
    ("@/components/ui/investment-path-card", "@/features/pricing/components/investment-path-card"),
    ("@/components/ui/partner-benefit", "@/features/pricing/components/partner-benefit"),
    ("@/components/ui/availability-live-dot", "@/features/shell/components/availability-live-dot"),
    ("@/components/ui/service-bullet-list", "@/features/services/components/service-bullet-list"),
    ("@/components/ui/service-metric-column", "@/features/services/components/service-metric-column"),
    ("@/components/ui/line-chart", "@/shared/ui/line-chart"),
    ("@/components/ui/wreath-badge", "@/features/home/components/wreath-badge"),
    ("@/components/ui/partner-portrait-image", "@/features/pricing/components/partner-portrait-image"),
    ("@/components/ui/tech-logo-panel", "@/features/pricing/components/tech-logo-panel"),
    ("@/components/ui/navbar-underline-link", "@/features/shell/components/navbar-underline-link"),
    ("@/components/ui/navbar-mobile-link", "@/features/shell/components/navbar-mobile-link"),
    ("@/components/ui/footer-link-column", "@/features/shell/components/footer-link-column"),
    ("@/components/ui/footer-nav-link", "@/features/shell/components/footer-nav-link"),
    ("@/components/ui/footer-legal-link", "@/features/shell/components/footer-legal-link"),
    ("@/components/ui/footer-social-link", "@/features/shell/components/footer-social-link"),
    ("@/components/ui/footer-contact-row", "@/features/shell/components/footer-contact-row"),
    ("@/components/ui/service-nav-link", "@/features/services/components/service-nav-link"),
    ("@/components/ui/service-timeline-rail", "@/features/services/components/service-timeline-rail"),
    ("@/components/ui/service-stage-card", "@/features/services/components/service-stage-card"),
    ("@/components/ui/service-faq-card", "@/features/services/components/service-faq-card"),
    ("@/components/ui/service-offer-card", "@/features/services/components/service-offer-card"),
    ("@/components/ui/service-impact-card", "@/features/services/components/service-impact-card"),
    ("@/components/ui/service-impact-modal", "@/features/services/components/service-impact-modal"),
    ("@/components/ui/pricing-plan-card", "@/features/pricing/components/pricing-plan-card"),
    ("@/components/ui/pricing-check-icon", "@/features/pricing/components/pricing-check-icon"),
    ("@/components/ui/sales-feature-item", "@/features/_legacy/sales-feature-item"),
    ("@/components/ui/home-notification-card", "@/features/_legacy/home-notification-card"),
]

text_ext = {".ts", ".tsx", ".js", ".mjs", ".css"}
changed = 0
for path in [*ROOT.joinpath("src").rglob("*"), Path("next.config.ts")]:
    if not path.is_file() or path.suffix not in text_ext:
        continue
    original = path.read_text(encoding="utf-8")
    updated = original
    for old, new in REPLACEMENTS:
        updated = updated.replace(old, new)
    if updated != original:
        path.write_text(updated, encoding="utf-8")
        changed += 1
        print(f"updated {path}")
print(f"rewrote {changed} files")
PY

  python3 - <<'PY'
from pathlib import Path

replacements = {
    "./SCS.module.css": "../styles/scs.module.css",
    "./HeroMediaCarousel.module.css": "../styles/hero-media-carousel.module.css",
    "./EnterpriseServicesHub.module.css": "../styles/enterprise-services-hub.module.css",
    "./BunnyVideoPlayer.module.css": "../styles/bunny-video-player.module.css",
}
root = Path("src/features/home")
for path in root.rglob("*"):
    if path.suffix not in {".ts", ".tsx", ".js", ".css"}:
        continue
    text = path.read_text(encoding="utf-8")
    new = text
    for old, nxt in replacements.items():
        new = new.replace(old, nxt)
    if new != text:
        path.write_text(new, encoding="utf-8")
        print(f"css-spec {path}")
PY

  echo "Phase 3 complete."
}

case "$PHASE" in
  1) phase1 ;;
  2) phase2 ;;
  3) phase3 ;;
  all) phase1; phase2; phase3 ;;
  *) echo "Usage: $0 <1|2|3|all>" >&2; exit 2 ;;
esac
