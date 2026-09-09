import { SiteNav } from '../components/layout/SiteNav';
import { SiteFooter } from '../components/layout/SiteFooter';
import { ServicesHero } from '../components/sections/services/ServicesHero';
import { ServicesIndex } from '../components/sections/services/ServicesIndex';
import { ServicesProcess } from '../components/sections/services/ServicesProcess';
import { FaqSection } from '../components/sections/FaqSection';
import { PageCta } from '../components/sections/PageCta';
import { servicesCta } from '../data/cta';

export function ServicesPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <ServicesHero />
        <ServicesIndex />
        <ServicesProcess />
        <FaqSection />
        <PageCta content={servicesCta} />
      </main>
      <SiteFooter />
    </>
  );
}
