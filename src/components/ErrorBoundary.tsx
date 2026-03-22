import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
            <AlertTriangle size={40} />
          </div>
          <h1 className="text-2xl font-bold text-white">¡Vaya! Algo salió mal.</h1>
          <p className="mt-2 max-w-md text-sm text-zinc-400">
            Hubo un error inesperado. Por favor, intenta recargar la página.
          </p>
          {this.state.error && (
            <div className="mt-6 max-w-lg overflow-auto rounded-lg bg-zinc-900 p-4 text-left text-xs font-mono text-red-400 border border-red-500/10">
              {this.state.error.message}
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-8 flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600"
          >
            <RefreshCw size={18} />
            Recargar Aplicación
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
