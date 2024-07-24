import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import { Container } from '@/styles/pages/app'
import { Header } from '@/components/header'

import { useState } from 'react'
import { CartModal } from '@/components/cart-modal'
import Cart from '@/providers/CartProvider'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)

  function openCartModal() {
    setIsCartModalOpen(true)
  }

  function closeCartModal() {
    setIsCartModalOpen(false)
  }

  return (
    <Cart>
      <Container>

        <Header 
          isCartModalOpen={isCartModalOpen}
          openCartModal={openCartModal}
        />

        <Component {...pageProps} />

        {isCartModalOpen && (
          <CartModal closeCartModal={closeCartModal} />
        )}


      </Container>
    </Cart>
  )
}