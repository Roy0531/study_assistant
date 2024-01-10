import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import '../styles/globals.css'


const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Study Assistant',
  description: 'A simple flashcard app with study progress visualization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <div className="flex flex-col">
          <Navbar />
          <main className='bg-drop-bg ml-[100px] min-h-screen py-6 px-10'>
            {children}
          </main>
        </div>
      </body>  
    </html>
  )
}
