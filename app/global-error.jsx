'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';
import ForbiddenPage from '@/components/ForbiddenPage';

export default function GlobalError({ error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  // Check for 403 error
  if (error?.status === 403) {
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
        <Error />
      </body>
    </html>
  );
}
