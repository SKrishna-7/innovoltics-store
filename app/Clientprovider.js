// app/Clientprovider.tsx (or app/Clientprovider.js)
'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '../store/UserContext';

export default function ClientProviders({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Optional: Customize as needed
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {children}
      </UserProvider>
    </QueryClientProvider>
  );
}