"use client"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

export function Provider({ children }: React.PropsWithChildren) {

  return <>
    <QueryClientProvider client={queryClient}>
      <Toaster richColors  />
      {children}
    </QueryClientProvider>
  </>
}