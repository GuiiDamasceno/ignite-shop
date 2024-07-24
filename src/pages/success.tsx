import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

interface SuccessProps {
  customerName: string;
  products: {
    id: string
    name: string;
    imageUrl: string;
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    clearCart()
  }, [])

  console.log(products.length)

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <div className="image-wrapper">
          {products.map((product) => {
            return (
              <ImageContainer key={product.id}>
                <Image
                  src={product.imageUrl}
                  alt=""
                  width={120}
                  height={110}
                />
              </ImageContainer>
            )
          })}
        </div>

        {products.length === 1 ? (
          <p>
            Uhuuul <strong>{customerName}</strong>, sua <strong>camiseta</strong> já está a caminho da sua casa.
          </p>
        ) : (
          <p>
            Uhuuul <strong>{customerName}</strong>, suas <strong>{products.length} camisetas </strong> já estão a caminho da sua casa.
          </p>
        )}

        <Link href='/'>
          Voltar ao catálogo
        </Link>
      </SuccessContainer>

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name
  const products = session.line_items.data.map(item => {
    const product = item.price.product as Stripe.Product

    return ({
      id: product.id,
      name: product.name,
      imageUrl: product.images[0]
    })
  })

  return {
    props: {
      customerName,
      products,
    },
  }
}