import { useRouter } from 'next/router'
import Script from 'next/script'
import { memo, useEffect } from 'react'

const TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

const GoogleAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    if (!TRACKING_ID || router.isPreview) return

    gtag('config', TRACKING_ID)
  }, [router.isPreview])

  if (!TRACKING_ID || router.isPreview) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
      ></Script>
      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />
    </>
  )
}
export default memo(GoogleAnalytics)
