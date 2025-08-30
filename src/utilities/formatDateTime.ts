export const formatDateTime = (timestamp: string): string => {
  const date = timestamp ? new Date(timestamp) : new Date()
  if (isNaN(date.getTime())) return ''

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short', // "PST" or "PDT"
  }).formatToParts(date)

  const get = (t: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === t)?.value || ''
  const MM = get('month')
  const DD = get('day')
  const YYYY = get('year')
  const HH = get('hour')
  const Min = get('minute')
  const AMPM = get('dayPeriod')?.toUpperCase() || ''
  const TZ = get('timeZoneName') // PST or PDT

  return `${MM}/${DD}/${YYYY} ${HH}:${Min} ${AMPM} ${TZ}`.trim()
}
