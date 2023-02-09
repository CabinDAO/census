import type { AppProps } from 'next/app'
import Head from 'next/head'
import GlobalStyles from '../styles/global'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Cabin Census</title>
        <meta
          name="description"
          content="Cabin encourages coliving in nature for creators and remote workers."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
