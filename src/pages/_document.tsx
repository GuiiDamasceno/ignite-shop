import Cart from '@/providers/CartProvider'
import { getCssText } from '@/styles'
import { Html, Head, Main, NextScript } from 'next/document'
import { ReactNode } from 'react'

export default function Document({ children }: { children: ReactNode }) {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />

        <style id='stitches' dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </Head>
      <body>
        <Cart>
          <Main />
          <NextScript />
          {children}
        </Cart>
      </body>
    </Html>
  )
}