import type { Answers } from "./questions";

const KEY = "resernova.diagnostic.session";

export type Session = {
  diagnosticId: string | null;
  step: number;
  answers: Answers;
  updatedAt: number;
};

const empty: Session = { diagnosticId: null, step: 1, answers: {}, updatedAt: 0 };

export function loadSession(): Session {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Session;
    if (!parsed || typeof parsed !== "object") return empty;
    return { ...empty, ...parsed };
  } catch {
    return empty;
  }
}

export function saveSession(session: Session) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...session, updatedAt: Date.now() }));
  } catch {
    /* ignore quota errors */
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
