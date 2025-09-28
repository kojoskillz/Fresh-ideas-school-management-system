"use client";

import { ReactNode, useState } from "react";
import AuthContextProvider from "@/contexts/authContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";

export default function AppProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster closeButton richColors={true} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
