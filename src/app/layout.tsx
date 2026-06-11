import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
import { CityProvider } from "@/components/site/CityContext";
import CitySelectModal from "@/components/site/CitySelectModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.seo.author }],
  metadataBase: new URL(siteConfig.seo.canonicalUrl),
  alternates: {
    canonical: siteConfig.seo.canonicalUrl,
  },
  robots: siteConfig.seo.indexable ? siteConfig.seo.robots : "noindex, nofollow",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }, siteConfig.seo.favicon],
    apple: "/logo.png",
  },
  openGraph: {
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    images: [siteConfig.seo.ogImage],
    url: siteConfig.seo.canonicalUrl,
    siteName: siteConfig.general.companyName,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    images: [siteConfig.seo.ogImage],
  },
  other: siteConfig.integrations.googleSearchConsoleVerification
    ? { "google-site-verification": siteConfig.integrations.googleSearchConsoleVerification }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { analytics, googleAds, metaPixel, tiktokPixel, integrations } = siteConfig;
  const gtagId = analytics.measurementId || googleAds.conversionId;

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CityProvider>
          {children}
          <CitySelectModal />
        </CityProvider>

        {/* Google Tag Manager */}
        {integrations.googleTagManagerId && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${integrations.googleTagManagerId}');`}
          </Script>
        )}

        {/* Google Analytics / Google Ads (gtag.js) */}
        {(analytics.enabled || googleAds.enabled) && gtagId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${analytics.enabled && analytics.measurementId ? `gtag('config', '${analytics.measurementId}');` : ""}
              ${googleAds.enabled && googleAds.conversionId ? `gtag('config', '${googleAds.conversionId}');` : ""}
              window.gtag = gtag;`}
            </Script>
          </>
        )}

        {/* Meta Pixel */}
        {metaPixel.enabled && metaPixel.pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixel.pixelId}');
            fbq('track', 'PageView');`}
          </Script>
        )}

        {/* TikTok Pixel */}
        {tiktokPixel.enabled && tiktokPixel.pixelId && (
          <Script id="tiktok-pixel" strategy="afterInteractive">
            {`!function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${tiktokPixel.pixelId}');
              ttq.page();
            }(window, document, 'ttq');`}
          </Script>
        )}
      </body>
    </html>
  );
}
