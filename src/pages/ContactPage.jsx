import { SiteNav } from '../components/layout/SiteNav';
import { SiteFooter } from '../components/layout/SiteFooter';
import { ContactHero } from '../components/sections/contact/ContactHero';
import { ContactForm } from '../components/sections/contact/ContactForm';
import { ContactReach } from '../components/sections/contact/ContactReach';
import { ContactNextSteps } from '../components/sections/contact/ContactNextSteps';

export function ContactPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="ctc-page" tabIndex={-1}>
        <ContactHero />
        <ContactForm />
        <ContactReach />
        <ContactNextSteps />
      </main>
      <SiteFooter />
    </>
  );
}
