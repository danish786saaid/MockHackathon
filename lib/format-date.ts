/**
 * Format an ISO date string as relative time (e.g. "Just now", "5 min ago")
 * using the given IANA timezone for consistency with user preference.
 * The diff is computed in UTC; the result is a relative string so timezone
 * mainly affects when "today" boundaries are (optional future use).
 */
export function formatRelativeTime(iso: string, timezone: string = "UTC"): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffMins / 1440);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffMins < 1440) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
}
