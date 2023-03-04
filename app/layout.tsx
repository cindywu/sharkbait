"use client"
import './global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body className={"bg-sky-200"}>{children}</body>
    </html>
  )
}



