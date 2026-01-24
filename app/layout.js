import './globals.css'

export const metadata = {
  title: 'Canyon Clash - Whiteout Survival Guide',
  description: 'Team coordination guide for Canyon Clash event in Whiteout Survival',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="crt antialiased min-h-screen bg-animated-gradient text-slate-100">
        {children}
      </body>
    </html>
  )
}