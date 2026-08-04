import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Chubby Blogs | Abhigyan',
    template: '%s | Chubby Blogs',
  },
  description:
    'Notes on AI, product, and music — as I build things. By Abhigyan.',
  keywords: ['blog', 'AI', 'product management', 'music', 'ChubbyRiffs', 'engineering'],
  authors: [{ name: 'Abhigyan' }],
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
