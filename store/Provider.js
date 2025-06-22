'use client';

import { UserProvider } from './UserContext';
const ProviderContext = createContext();
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

const queryClient = new QueryClient();
export const Provider = ({ children }) => {
    return(
        <QueryClientProvider client={queryClient}>
            <UserProvider>
       
                <ProviderContext.Provider value={{}}>
                    {children}
                </ProviderContext.Provider>
       
       </UserProvider>
        </QueryClientProvider>
    )
};


