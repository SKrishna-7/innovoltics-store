'use client';

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from './UserContext';

const queryClient = new QueryClient();

export const Provider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {children}
      </UserProvider>
    </QueryClientProvider>
  );
};
