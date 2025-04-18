import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'TypeWindow',
  description: 'Write at the speed of thought.',
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  metadataBase: new URL('https://slop.lat'),
  openGraph: {
    title: 'TypeWindow',
    description: 'Write at the speed of thought.',
    url: 'https://slop.lat',
    siteName: 'TypeWindow',
    /* images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ], */
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark"]}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
