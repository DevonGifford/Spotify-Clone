import { Figtree } from 'next/font/google'

import './globals.css'


const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Spotify Clone Portfolio Project',
}





export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
      
        {children}
      
      </body>
    </html>
  )
}
