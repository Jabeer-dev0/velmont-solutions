import { useState } from 'react';
import { site } from '../../data/site';
import { TextLogo } from './TextLogo';

export function ImageLogo({ height = 46, variant = 'light', className = '', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false);
  const src =
    variant === 'dark'
      ? site.images.logoDark
      : variant === 'lightWhite'
        ? site.images.logoLightWhite
        : site.images.logoLight;

  if (failed) {
    return <TextLogo light={variant === 'light'} className={className} />;
  }

  return (
    <img
      className={`vx-imglogo ${className}`.trim()}
      src={src}
      alt="Velmont Solutions"
      width={height}
      height={height}
      style={{ height }}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
