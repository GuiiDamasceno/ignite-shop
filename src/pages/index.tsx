import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import Head from "next/head";

import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";

import { Bag } from '@phosphor-icons/react'
import { useShoppingCart } from "use-shopping-cart";

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
    defaultPriceId: string
    priceInCents: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  const { addItem } = useShoppingCart()

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Product key={product.id} className="keen-slider__slide">
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <button onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.name,
                    imageUrl: product.imageUrl,
                    price: product.priceInCents,
                    price_id: product.defaultPriceId,
                    currency: 'BRL'
                  })
                }}>
                  <Bag size={24} weight="bold" />
                </button>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0] || '',
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      priceInCents: price.unit_amount,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
