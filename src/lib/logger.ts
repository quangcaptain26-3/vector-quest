/**
 * Development-only logger for Vector Quest – Math 10.
 * Emits zero console output in production builds on Vercel.
 */

const isDev = process.env.NODE_ENV === "development";

export function devLog(event: string, details?: Record<string, unknown>): void {
  if (!isDev) return;
  if (details) {
    console.info(`[VectorQuest] ${event}`, details);
  } else {
    console.info(`[VectorQuest] ${event}`);
  }
}

export function devWarn(event: string, details?: Record<string, unknown>): void {
  if (!isDev) return;
  if (details) {
    console.warn(`[VectorQuest] ${event}`, details);
  } else {
    console.warn(`[VectorQuest] ${event}`);
  }
}
