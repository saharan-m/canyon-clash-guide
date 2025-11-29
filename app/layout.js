import './globals.css'

export const metadata = {
  title: 'Canyon Clash - Whiteout Survival Guide',
  description: 'Team coordination guide for Canyon Clash event in Whiteout Survival',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}