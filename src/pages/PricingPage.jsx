import { SiteNav } from '../components/layout/SiteNav';
import { SiteFooter } from '../components/layout/SiteFooter';
import { PricingHero } from '../components/sections/pricing/PricingHero';
import { PricingPlans } from '../components/sections/pricing/PricingPlans';
import { PricingCompare } from '../components/sections/pricing/PricingCompare';
import { PricingFaq } from '../components/sections/pricing/PricingFaq';
import { PricingCta } from '../components/sections/pricing/PricingCta';

export function PricingPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="prc-page" tabIndex={-1}>
        <PricingHero />
        <PricingPlans />
        <PricingCompare />
        <PricingFaq />
        <PricingCta />
      </main>
      <SiteFooter />
    </>
  );
}
