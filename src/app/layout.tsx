import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { getServerSession } from 'next-auth';
import SessionProvider from "./components/SessionProvider";
import './globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'REVERSE APP',
  description: 'Songwriting app made by Wojciech Glid',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} w-full min-h-screen flex flex-col items-center [perspective:_200px] overflow-hidden`}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}