import { SiteNav } from '../components/layout/SiteNav';
import { SiteFooter } from '../components/layout/SiteFooter';
import { PrivacyHero } from '../components/sections/privacy/PrivacyHero';
import { PrivacyContent } from '../components/sections/privacy/PrivacyContent';
import { PrivacyCta } from '../components/sections/privacy/PrivacyCta';

export function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="abt-page leg-page" tabIndex={-1}>
        <PrivacyHero />
        <PrivacyContent />
        <PrivacyCta />
      </main>
      <SiteFooter />
    </>
  );
}
