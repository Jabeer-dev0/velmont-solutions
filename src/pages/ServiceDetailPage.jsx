import { useEffect, useLayoutEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { SiteNav } from '../components/layout/SiteNav';
import { SiteFooter } from '../components/layout/SiteFooter';
import { ServiceDetailView } from '../components/sections/services/ServiceDetailView';
import { getServiceDetail } from '../data/serviceDetails';
import { setNavScrollLocked } from '../lib/navScrollGate';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = slug ? getServiceDetail(slug) : null;

  useLayoutEffect(() => {
    if (!slug || !service) return undefined;
    setNavScrollLocked(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    return () => setNavScrollLocked(false);
  }, [slug, service]);

  useEffect(() => {
    if (!slug) return undefined;
    const id = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(id);
  }, [slug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <SiteNav />
      <main id="main-content" className="svc-detail-page abt-page" tabIndex={-1}>
        <ServiceDetailView key={service.slug} service={service} />
      </main>
      <SiteFooter />
    </>
  );
}
