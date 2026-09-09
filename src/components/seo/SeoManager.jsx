import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoForPath } from '../../data/seo';
import { applyPageSeo } from '../../lib/pageSeo';

const JSON_LD_ID = 'velmont-jsonld';

function upsertJsonLd(data) {
  let script = document.getElementById(JSON_LD_ID);
  if (!script) {
    script = document.createElement('script');
    script.id = JSON_LD_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function SeoManager() {
  const { pathname } = useLocation();
  const seo = useMemo(() => getSeoForPath(pathname), [pathname]);

  useEffect(() => {
    applyPageSeo(seo);
    upsertJsonLd(seo.schema());
  }, [seo]);

  return null;
}
