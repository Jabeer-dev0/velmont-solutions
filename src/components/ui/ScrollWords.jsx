import { useId, useLayoutEffect, useMemo, useRef } from 'react';
import { revealWords } from '../../lib/scrollReveal';

function splitText(text, prefix) {
  const parts = text.split(/\s+/).filter(Boolean);
  const out = [];

  parts.forEach((word, index) => {
    if (index > 0) out.push(' ');
    out.push(
      <span data-word="" key={`${prefix}-${index}`}>
        {word}
      </span>,
    );
  });

  return out;
}

function splitNode(node, prefix) {
  if (node == null || typeof node === 'boolean') return [];
  if (typeof node === 'string') return splitText(node, prefix);

  if (Array.isArray(node)) {
    return node.flatMap((child, index) => splitNode(child, `${prefix}-${index}`));
  }

  // Keep structural elements (br, custom spans) as-is.
  if (typeof node.type !== 'string' || node.type === 'br') return [node];

  const { children, ...props } = node.props;
  return [
    <node.type {...props} key={prefix}>
      {splitNode(children, `${prefix}-c`)}
    </node.type>,
  ];
}

/**
 * Heading text that reveals word-by-word on scroll.
 * Accepts mixed children (strings, <em>, <br/>) and wraps each word in a
 * span the reveal animation can stagger. Reduced-motion users see plain text.
 */
export function ScrollWords({ as: Tag = 'span', className, children, start = 'top 88%', stagger, duration, ...rest }) {
  const ref = useRef(null);
  const uid = `sw${useId().replace(/:/g, '')}`;
  const words = useMemo(() => splitNode(children, uid), [children, uid]);

  useLayoutEffect(() => {
    return revealWords(ref.current, { start, stagger, duration });
  }, [start, stagger, duration]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {words}
    </Tag>
  );
}
