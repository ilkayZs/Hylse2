export const metadata = {
  title: 'Sign-in',
  description: 'Sign in Hylse',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
