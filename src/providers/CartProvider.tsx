"use client"

import { ReactNode } from "react"
import { CartProvider } from "use-shopping-cart"

export default function Cart({ children }: { children: ReactNode }) {
  return (
    <CartProvider
      mode='payment'
      successUrl={`${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
      cancelUrl={`${process.env.NEXT_URL}/`}
      stripe={process.env.STRIPE_SECRET_KEY}
      shouldPersist={true} 
      cartMode='client-only'
      currency='BRL'
      language="pt-BR"
    >
      {children}
    </CartProvider>
  )
}