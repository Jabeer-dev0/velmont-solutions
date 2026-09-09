/** Parse showcase stat strings for count-up animation. */
export function parseStatValue(raw) {
  if (!raw || typeof raw !== 'string') {
    return { kind: 'text', display: String(raw ?? '') };
  }

  const trimmed = raw.trim();
  const match = trimmed.match(/^([+-]?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { kind: 'text', display: trimmed };
  }

  const numStr = match[2];

  return {
    kind: 'number',
    prefix: match[1] ?? '',
    end: Number(numStr),
    suffix: match[3] ?? '',
    decimals: numStr.includes('.') ? numStr.split('.')[1].length : 0,
    display: trimmed,
  };
}

export function formatStatValue(value, suffix = '', prefix = '', decimals = 0) {
  const num = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
  return `${prefix}${num}${suffix}`;
}

/** Format a parsed stat at a given numeric value (defaults to final value). */
export function formatParsedStat(parsed, value) {
  if (parsed.kind === 'text') return parsed.display;
  const nextValue = value ?? parsed.end;
  return formatStatValue(nextValue, parsed.suffix, parsed.prefix ?? '', parsed.decimals ?? 0);
}

export function snapStepForParsed(parsed) {
  if (parsed.kind !== 'number') return 1;
  return parsed.decimals > 0 ? 10 ** -parsed.decimals : 1;
}
