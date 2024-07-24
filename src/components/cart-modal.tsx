"use client"

import { CartModalWrapper, CartModalContent, ImageContainer } from '@/styles/components/cart-modal'
import Image from 'next/image'
import { X } from '@phosphor-icons/react'
import { useShoppingCart } from 'use-shopping-cart'
import axios from 'axios'
import { useState } from 'react'
import { Product as IProduct } from 'use-shopping-cart/core'

interface CartModalProps {
  closeCartModal: () => void
}
export function CartModal({ closeCartModal }: CartModalProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const {
    cartCount,
    cartDetails,
    removeItem,
    formattedTotalPrice,
  } = useShoppingCart()

  const products: IProduct[] = Object.keys(cartDetails).map(item => cartDetails[item]);


  const cart = Object.values(cartDetails ?? {}).map(
    (cartItem: IProduct) => cartItem
  )

  async function handleBuyProduct() {
    const productsToCheckout = cart.map((cartItem) => {
      return {
        price: cartItem.price_id,
        quantity: cartItem.quantity,
      }
    })

    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        products: productsToCheckout,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <div>
      {cartCount > 0 ? (
        <CartModalWrapper>
          <CartModalContent>
            <div className='content-wrapper'>
              <div className="close-button">
                <button onClick={closeCartModal}>
                  <X />
                </button>
              </div>

              <h1>Sacola de compras</h1>

              {cart.map(product => (
                <div key={product.id} className='card'>
                  <ImageContainer>
                    <Image
                      src={product.imageUrl}
                      alt='Product Image'
                      width={90}
                      height={100}
                    />
                  </ImageContainer>
                  <div className='product-info'>
                    <p>{product.name}</p>
                    <span>{product.formattedPrice}</span>
                    <button onClick={() => removeItem(product.id)}>
                      Remover
                    </button>
                  </div>
                </div>
              ))}

              <div className='finalize-info'>
                <div className='quantity-price'>
                  <div className='quantity'>
                    <p>Quantidade</p>
                    <span>{cartCount} itens</span>
                  </div>

                  <div className='price'>
                    <p>Valor total</p>
                    <span>{formattedTotalPrice}</span>
                  </div>
                </div>

                <button
                  onClick={handleBuyProduct}
                  className='finalize-purchase-button'
                  disabled={isCreatingCheckoutSession || cartCount <= 0}
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          </CartModalContent>
        </CartModalWrapper>
      ) : (
        <CartModalWrapper>
          <CartModalContent>
            <div className="close-button">
              <button onClick={closeCartModal}>
                <X />
              </button>
            </div>

            <h2>Sacola de compras vazia</h2>
          </CartModalContent>
        </CartModalWrapper>
      )}
    </div>
  )
}