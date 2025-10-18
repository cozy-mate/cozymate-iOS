export function formatDateYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function startOfWeekSunday(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay(); // 0: Sun
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function getWeeksAround(centerWeekStart: Date, weekRange = 6) {
  const arr: Date[] = [];
  for (let i = -weekRange; i <= weekRange; i++) {
    const ws = addDays(centerWeekStart, i * 7);
    arr.push(ws);
  }
  return arr;
}
