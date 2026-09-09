import { SiteNav } from '../components/layout/SiteNav';
import { SiteFooter } from '../components/layout/SiteFooter';
import { AboutHero } from '../components/sections/about/AboutHero';
import { AboutProblem } from '../components/sections/about/AboutProblem';
import { AboutOrigin } from '../components/sections/about/AboutOrigin';
import { AboutValues } from '../components/sections/about/AboutValues';
import { AboutArchitecture } from '../components/sections/about/AboutArchitecture';
import { PageCta } from '../components/sections/PageCta';
import { aboutCta } from '../data/cta';

export function AboutPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="abt-page" tabIndex={-1}>
        <AboutHero />
        <AboutProblem />
        <AboutOrigin />
        <AboutValues />
        <AboutArchitecture />
        <PageCta content={aboutCta} />
      </main>
      <SiteFooter />
    </>
  );
}
