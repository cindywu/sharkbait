"use client"
import '../styles/globals.css'
import { AuthProvider } from 'react-auth-kit'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider authType = {'cookie'}
authName={'_auth'}
cookieDomain={window.location.hostname}
cookieSecure={window.location.protocol === "https:"}>
    <html>
      <head />
      <body className={"bg-sky-200"}>{children}</body>
    </html>
    </AuthProvider>
  )
}



