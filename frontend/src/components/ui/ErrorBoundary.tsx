"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full rounded-2xl border border-red-500/20 bg-[#07080f] p-6 text-center text-zinc-300 shadow-xl backdrop-blur-xl">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-100">
            {this.props.fallbackTitle || "Bileşen yüklenirken bir sorun oluştu"}
          </h3>
          <p className="mt-1 text-xs text-zinc-400">
            {this.props.fallbackMessage ||
              "Lütfen tarayıcı önbelleğinizi temizleyin veya yeniden deneyin."}
          </p>
          <button
            onClick={this.handleReset}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/20"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Yeniden Dene
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
