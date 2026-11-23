"use client";

import katex from "katex";

export interface MathFormulaProps {
  /** LaTeX expression to render with KaTeX */
  tex: string;
  /** Render in block/display mode when true, inline mode by default */
  displayMode?: boolean;
  /** Additional utility classes applied to the wrapper element */
  className?: string;
}

/**
 * Safe KaTeX wrapper using katex.renderToString() directly for React 19 compatibility.
 * Falls back to plain code text if KaTeX throws on malformed input.
 */
export function MathFormula({
  tex,
  displayMode = false,
  className = "",
}: MathFormulaProps) {
  let html = "";
  let failed = false;

  try {
    html = katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      output: "htmlAndMathml",
      strict: "ignore",
    });
  } catch {
    failed = true;
  }

  if (failed || !html) {
    return (
      <code className={`font-telemetry-sm text-telemetry-sm ${className}`}>
        {tex}
      </code>
    );
  }

  const Tag = displayMode ? "div" : "span";

  return (
    <Tag
      className={className}
      aria-label={tex}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
