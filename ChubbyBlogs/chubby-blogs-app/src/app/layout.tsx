import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Chubby Blogs | Abhigyan',
    template: '%s | Chubby Blogs',
  },
  description:
    'Things worth knowing. One word at a time. By Abhigyan.',
  keywords: ['blog', 'AI', 'product management', 'music', 'ChubbyRiffs', 'engineering'],
  authors: [{ name: 'Abhigyan' }],
  icons: {
    icon: '/cb-logo.png',
    apple: '/cb-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Chubby Blogs',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
