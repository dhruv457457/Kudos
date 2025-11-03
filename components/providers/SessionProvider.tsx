'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import React from 'react';

interface SessionProviderProps {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: SessionProviderProps) {
  // The 'SessionProvider' from next-auth/react provides the context
  return (
    <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
  );
}