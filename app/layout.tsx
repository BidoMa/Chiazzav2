import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import VideoConfig from "@/components/video-config"
import { Lato } from "next/font/google" // Import Lato font

// Configure Lato font
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Specify weights you need
  variable: "--font-lato", // Define a CSS variable for the font
})

export const metadata: Metadata = {
  title: "Chiazza - Franquicia de Chocolates Premium",
  description: "Descubrí el sabor del mejor chocolate artesanal y convertite en franquiciado de Chiazza",
  icons: {
    icon: "/chiazza-logo.png",
  },
  generator: "v0.dev",
}

export const viewport: Viewport = {
  themeColor: "#7f1d1d",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${lato.variable}`}>
      <head>
        {/* Removed preconnect links for Google Fonts as next/font handles it */}
        <meta name="description" content="Franquicia de chocolates premium Chiazza" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MNR9SRL3');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MNR9SRL3"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <VideoConfig />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
