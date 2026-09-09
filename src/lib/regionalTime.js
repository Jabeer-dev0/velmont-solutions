export function formatRegionalTime(timeZone, date = new Date(), options = {}) {
  const { hour12 = false } = options;

  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12,
    timeZone,
  }).format(date);
}

export function timezoneLabel(timeZone, date = new Date()) {
  const part = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    timeZoneName: 'short',
  })
    .formatToParts(date)
    .find((entry) => entry.type === 'timeZoneName');

  return part?.value ?? timeZone;
}

export function regionalClock(timeZone, date = new Date()) {
  return {
    time: formatRegionalTime(timeZone, date, { hour12: true }),
    time24: formatRegionalTime(timeZone, date, { hour12: false }),
    zone: timezoneLabel(timeZone, date),
  };
}
