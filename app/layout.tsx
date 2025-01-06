// import type { Metadata } from 'next'
// import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';
// import '@/app/globals.css'
// import { Navbar } from '@/components/Navbar'
// import { ClerkProvider } from '@clerk/nextjs'
// import { ApiDataContextProvider } from './Context/Store'
// import { ThemeProvider } from './Context/Theme'

// const geistSans = Geist({
//   subsets: ['latin'],
//   variable: '--font-sans',
// })

// const geistMono = Geist_Mono({
//   subsets: ['latin'],
//   variable: '--font-mono',
// })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900`}
//       >
//         {ClerkProvider({
//           children: (
//             <ThemeProvider>
//               <ApiDataContextProvider>
//                 <Navbar />
//                 {children}
//               </ApiDataContextProvider>
//             </ThemeProvider>
//           )
//         })}
//       </body>
//     </html>
//   )
// }


// import type { Metadata } from 'next'
// import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';
"use client"
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { ClerkProvider } from '@clerk/nextjs'
import { ApiDataContextProvider } from './Context/Store'
import { ThemeProvider } from './Context/Theme'
// import AuthWrapper from './auth';

// const geistSans = Geist({
//   subsets: ['latin'],
//   variable: '--font-sans',
// })

// const geistMono = Geist_Mono({
//   subsets: ['latin'],
//   variable: '--font-mono',
// })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <ClerkProvider>
          <html lang="en">
          <body className={inter.className}>
          <ThemeProvider>
            
            <ApiDataContextProvider>
              <Navbar />
              {children}
            </ApiDataContextProvider>
          

          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
    </>
  )
}



