import type React from "react"
import type { Metadata } from "next"
import { Lato } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Franquicias Chiazza - Chocolatería Premium",
  description:
    "Abrí tu propia franquicia Chiazza. Chocolates artesanales de la más alta calidad con un modelo de negocio probado y rentable.",
  keywords: [
    "franquicia",
    "chocolatería",
    "Chiazza",
    "negocio rentable",
    "chocolates artesanales",
    "inversión",
    "emprendimiento",
  ],
  authors: [{ name: "Chiazza" }],
  creator: "Chiazza",
  publisher: "Chiazza",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://chiazza.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Franquicias Chiazza - Chocolatería Premium",
    description:
      "Abrí tu propia franquicia Chiazza. Chocolates artesanales de la más alta calidad con un modelo de negocio probado y rentable.",
    url: "https://chiazza.vercel.app",
    siteName: "Franquicias Chiazza",
    images: [
      {
        url: "/chiazza-store-hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Franquicia Chiazza - Chocolatería Premium",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Franquicias Chiazza - Chocolatería Premium",
    description:
      "Abrí tu propia franquicia Chiazza. Chocolates artesanales de la más alta calidad con un modelo de negocio probado y rentable.",
    images: ["/chiazza-store-hero.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#0D2747",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MNR9SRL3');
            `,
          }}
        />
        <Script
          id="error-handler"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                if (e.message && e.message.includes('ResizeObserver loop')) {
                  e.stopImmediatePropagation();
                  return false;
                }
              });
              
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && e.reason.message && e.reason.message.includes('ResizeObserver loop')) {
                  e.preventDefault();
                  return false;
                }
              });
            `,
          }}
        />
      </head>
      <body className={lato.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MNR9SRL3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  )
}
