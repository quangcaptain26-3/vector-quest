"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Radar, RotateCcw } from "lucide-react";

interface CanvasErrorBoundaryProps {
  children: ReactNode;
}

interface CanvasErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

/**
 * Cô lập lỗi dựng hình SVG Radar Canvas để các nút điều khiển và bài học vẫn hoạt động bình thường.
 */
export class CanvasErrorBoundary extends Component<
  CanvasErrorBoundaryProps,
  CanvasErrorBoundaryState
> {
  constructor(props: CanvasErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error: Error): CanvasErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || "Lỗi hiển thị màn hình Radar",
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (process.env.NODE_ENV === "development") {
      console.error("[CanvasErrorBoundary]", error, info.componentStack);
    }
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div
        role="alert"
        className="w-full h-full min-h-[360px] flex items-center justify-center bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-space-lg"
      >
        <div className="max-w-sm bg-surface-container-low/90 backdrop-blur-md border border-error/40 rounded-xl p-space-md flex flex-col items-center text-center gap-space-sm shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <div className="w-10 h-10 rounded-full bg-error-container/50 text-error flex items-center justify-center">
            <Radar className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="font-label-caps text-label-caps text-error uppercase tracking-widest">
            MÀN HÌNH RADAR TẠM NGƯNG
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {this.state.errorMessage}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-1 px-space-md py-space-xs rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-telemetry-sm text-telemetry-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Khởi động lại Radar</span>
          </button>
        </div>
      </div>
    );
  }
}
