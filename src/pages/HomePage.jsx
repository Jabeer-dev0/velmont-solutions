import { SiteNav } from '../components/layout/SiteNav';
import { SiteFooter } from '../components/layout/SiteFooter';
import { HeroSection } from '../components/sections/HeroSection';
import { ServicesBento } from '../components/sections/ServicesBento';
import { ShowcaseSection } from '../components/sections/ShowcaseSection';
import { ProcessGallery } from '../components/sections/ProcessGallery';
import { PricingSection } from '../components/sections/PricingSection';
import { FaqSection } from '../components/sections/FaqSection';
import { PageCta } from '../components/sections/PageCta';
import { homeCta } from '../data/cta';

export function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ServicesBento />
        <ShowcaseSection />
        <ProcessGallery />
        <PricingSection />
        <FaqSection />
        <PageCta content={homeCta} />
      </main>
      <SiteFooter />
    </>
  );
}
