import { addDays, format, isBefore, isValid, parseISO, startOfDay } from "date-fns";

function parseTravelDate(value?: string) {
  if (!value) return null;

  const parsed = parseISO(value);
  return isValid(parsed) ? startOfDay(parsed) : null;
}

export function getTodayIsoDate(now = new Date()) {
  return format(startOfDay(now), "yyyy-MM-dd");
}

export function addDaysToIsoDate(isoDate: string, days: number) {
  const parsed = parseTravelDate(isoDate) ?? startOfDay(new Date());
  return format(addDays(parsed, days), "yyyy-MM-dd");
}

export function getDefaultTravelWindow(now = new Date()) {
  const start = addDays(startOfDay(now), 14);
  const end = addDays(start, 3);

  return {
    start: format(start, "yyyy-MM-dd"),
    end: format(end, "yyyy-MM-dd"),
  };
}

export function normalizeTravelWindow(start?: string, end?: string, now = new Date()) {
  const defaults = getDefaultTravelWindow(now);
  const defaultStart = parseTravelDate(defaults.start) ?? startOfDay(now);
  let safeStart = parseTravelDate(start) ?? defaultStart;

  if (isBefore(safeStart, startOfDay(now))) {
    safeStart = defaultStart;
  }

  let safeEnd = parseTravelDate(end) ?? addDays(safeStart, 3);

  if (!isBefore(safeStart, safeEnd)) {
    safeEnd = addDays(safeStart, 1);
  }

  return {
    start: format(safeStart, "yyyy-MM-dd"),
    end: format(safeEnd, "yyyy-MM-dd"),
  };
}

export function validateTravelWindow(start: string, end: string, now = new Date()) {
  const today = getTodayIsoDate(now);

  if (!start || !end) {
    return { valid: false, message: "Choisissez vos dates de voyage." };
  }

  if (start < today) {
    return { valid: false, message: "La date d'arrivee ne peut pas etre deja passee." };
  }

  if (end <= start) {
    return { valid: false, message: "La date de depart doit etre apres l'arrivee." };
  }

  return { valid: true, message: "" };
}

export function clampTravelers(value?: number | string, fallback = 2) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.max(1, Math.min(8, Math.round(parsed)));
}

export function buildRouteWithParams(
  pathname: string,
  params: Record<string, number | string | undefined>,
) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `${pathname}?${query}` : pathname;
}
