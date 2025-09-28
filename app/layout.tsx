import type React from "react"
import type { Metadata } from "next"
import { Lato } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Franquicias Chiazza - Chocolates Artesanales Premium | Oportunidad de Negocio",
  description:
    "Descubrí el sabor del mejor chocolate artesanal y convertite en franquiciado de Chiazza. Negocio rentable con más de 20 años de experiencia. Solicita información sobre nuestra franquicia de chocolates premium.",
  keywords: [
    "franquicia chiazza",
    "chocolates artesanales",
    "franquicias argentina",
    "negocio rentable",
    "chocolate premium",
    "oportunidad de negocio",
    "franquicia chocolatería",
    "inversión rentable",
    "alfajores artesanales",
    "bombones premium",
  ],
  authors: [{ name: "Chiazza", url: "https://franquiciaschiazza.com.ar" }],
  creator: "Chiazza",
  publisher: "Chiazza",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://franquiciaschiazza.com.ar"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Franquicias Chiazza - Chocolates Artesanales Premium",
    description:
      "Descubrí el sabor del mejor chocolate artesanal y convertite en franquiciado de Chiazza. Negocio rentable con el respaldo de una marca líder.",
    url: "https://franquiciaschiazza.com.ar",
    siteName: "Franquicias Chiazza",
    images: [
      {
        url: "/chiazza-logo-new.webp",
        width: 1200,
        height: 630,
        alt: "Franquicias Chiazza - Chocolates Artesanales Premium",
        type: "image/webp",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Franquicias Chiazza - Chocolates Artesanales Premium",
    description:
      "Descubrí el sabor del mejor chocolate artesanal y convertite en franquiciado de Chiazza. Negocio rentable con el respaldo de una marca líder.",
    images: ["/chiazza-logo-new.webp"],
    creator: "@chocolateschiazza",
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
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#0D2747",
    "msapplication-TileColor": "#0D2747",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" dir="ltr">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Immediately override console.error
                const originalError = console.error;
                console.error = function(...args) {
                  const message = args.join(' ');
                  if (message.includes('ResizeObserver')) {
                    return;
                  }
                  originalError.apply(console, args);
                };
                
                // Override window.onerror immediately
                window.onerror = function(message, source, lineno, colno, error) {
                  if (typeof message === 'string' && message.includes('ResizeObserver')) {
                    return true;
                  }
                  return false;
                };
                
                // Set up error event listener immediately
                window.addEventListener('error', function(e) {
                  if (e.message && e.message.includes('ResizeObserver')) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return false;
                  }
                });
              })();
            `,
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//js.hsforms.net" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preload" href="/chiazza-logo-new.webp" as="image" type="image/webp" />
        <link rel="preload" href="/chiazza-store-hero.jpeg" as="image" type="image/jpeg" />

        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Chiazza",
              description: "Franquicias de chocolates artesanales premium con más de 20 años de experiencia",
              url: "https://franquiciaschiazza.com.ar",
              logo: "https://franquiciaschiazza.com.ar/chiazza-logo-new.webp",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                areaServed: "AR",
                availableLanguage: "Spanish",
              },
              sameAs: ["https://www.facebook.com/chocolateschiazza", "https://www.instagram.com/chocolateschiazza"],
              offers: {
                "@type": "Offer",
                name: "Franquicia Chiazza",
                description: "Oportunidad de franquicia para chocolatería artesanal premium",
                category: "Franchise Opportunity",
              },
            }),
          }}
        />

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
