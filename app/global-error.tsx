'use client';

import ForbiddenPage from '@/components/ForbiddenPage';
import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { Component, ReactNode } from 'react';

interface GlobalErrorState {
  hasError: boolean;
  error?: Error & { digest?: string; status?: number };
}

interface GlobalErrorProps {
  children: ReactNode;
  error: Error & { digest?: string; status?: number };
}

class GlobalErrorBoundary extends Component<
  GlobalErrorProps,
  GlobalErrorState
> {
  constructor(props: GlobalErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): GlobalErrorState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  render() {
    if (this.state.hasError) {
      // Check for 403 error
      if (this.props.error?.status === 403) {
        return (
          <html>
            <body>
              <ForbiddenPage />
            </body>
          </html>
        );
      }

      return (
        <html>
          <body>
            <NextError statusCode={this.props.error?.status || 500} />
          </body>
        </html>
      );
    }

    return this.props.children;
  }
}

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string; status?: number };
}) {
  return <GlobalErrorBoundary error={error}>{null}</GlobalErrorBoundary>;
}
