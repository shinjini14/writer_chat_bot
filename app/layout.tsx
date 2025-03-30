import type React from "react"
import "./globals.css"

export const metadata = {
  title: "Plotpointe",
  description: "Plotpointe Chat Interface",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0, overflow: "hidden" }}>
        {children}
      </body>
    </html>
  )
}



import './globals.css'