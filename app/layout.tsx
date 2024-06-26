import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { TLayoutProps } from '@/types/defaults'
import { Toaster } from '@/components/ui/sonner'
import { ExitModal } from '@/components/modals/ExitModal'
import { HeartsModal } from '@/components/modals/HeartsModal'
import { PracticeModal } from '@/components/modals/PracticeModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Catlingo',
  description: 'Catlingo',
}

export default function RootLayout({ children }: Readonly<TLayoutProps>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </ClerkProvider>
    </html>
  )
}
