import { forwardRef } from 'react';

export const SectionImage = forwardRef(function SectionImage(
  { src, alt, className, loading = 'lazy', fetchPriority, ...rest },
  ref,
) {
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      {...rest}
    />
  );
});
