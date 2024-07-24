"use client"

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import Image from "next/image"

import { GetStaticProps, GetStaticPaths } from "next"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import { useRouter } from "next/router"
import { useState } from "react"
import Head from "next/head"
import { useShoppingCart } from "use-shopping-cart"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
    priceInCents: number;
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { addItem } = useShoppingCart()

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }


  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button 
            onClick={() => {
              addItem({
                id: product.id,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.priceInCents,
                price_id: product.defaultPriceId,
                currency: 'BRL'
              })
            }} 
            disabled={isCreatingCheckoutSession}
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_QTqMcUzS2jVuQH' } },
      { params: { id: 'prod_QTqLFepTJLMmwf' } },
      { params: { id: 'prod_QTqLuHqUmBPHmk' } },
      { params: { id: 'prod_QTqKiVmqxjig3L' } },
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
        priceInCents: price.unit_amount,
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}