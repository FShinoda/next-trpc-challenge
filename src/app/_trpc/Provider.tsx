'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/app/_trpc/client";

export default function Provider({children}: {children: React.ReactNode}) {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() => 
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )


}