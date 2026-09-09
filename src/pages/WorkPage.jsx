import { SiteNav } from '../components/layout/SiteNav';
import { SiteFooter } from '../components/layout/SiteFooter';
import { WorkHero } from '../components/sections/work/WorkHero';
import { WorkFeatured } from '../components/sections/work/WorkFeatured';
import { WorkGrid } from '../components/sections/work/WorkGrid';
import { WorkProof } from '../components/sections/work/WorkProof';
import { PageCta } from '../components/sections/PageCta';
import { workCta } from '../data/cta';

export function WorkPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="wrk-page" tabIndex={-1}>
        <WorkHero />
        <WorkFeatured />
        <WorkGrid />
        <WorkProof />
        <PageCta content={workCta} />
      </main>
      <SiteFooter />
    </>
  );
}
