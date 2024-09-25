import type { Metadata } from 'next'
import './app.css'

export const metadata: Metadata = {
  title: 'Effekt Playground — Next',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicons/icon-512.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
