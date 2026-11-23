"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { getTranslations } from "@/lib/i18n";
import { useSimulationStore } from "@/store/useSimulationStore";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error Boundary cấp toàn trang cho giao diện Buồng lái Vector Quest • Math 10.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const language = useSimulationStore((s) => s.language);
  const t = getTranslations(language).errors;

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("[VectorQuest] Route ErrorBoundary caught:", error);
    }
  }, [error]);

  return (
    <main className="min-h-screen w-full bg-surface text-on-surface flex items-center justify-center p-space-lg">
      <section
        role="alert"
        className="w-full max-w-md bg-surface-container-low/90 backdrop-blur-xl border border-error/40 rounded-xl p-space-lg shadow-[0_16px_48px_rgba(0,0,0,0.65)] flex flex-col gap-space-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="w-8 h-8 rounded-full bg-error-container/60 text-error flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-error uppercase tracking-widest">
                {t.globalEyebrow}
              </span>
              <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {t.globalTitle}
              </h1>
            </div>
          </div>
          <span className="font-telemetry-sm text-telemetry-sm text-error bg-surface-container-high px-space-xs py-[2px] rounded">
            {t.globalBadge}
          </span>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {t.globalBody}
        </p>

        {error.message ? (
          <pre className="bg-surface-container-lowest/90 border border-outline-variant/60 rounded-lg p-space-sm font-telemetry-sm text-telemetry-sm text-error overflow-x-auto">
            {error.message}
          </pre>
        ) : null}

        <button
          type="button"
          onClick={reset}
          className="w-full py-3 px-space-md rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-space-xs transition-all shadow-[0_0_24px_rgba(56,189,248,0.45)] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>{t.globalResetBtn}</span>
        </button>
      </section>
    </main>
  );
}
