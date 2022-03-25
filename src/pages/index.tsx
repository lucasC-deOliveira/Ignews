import Head from "next/head"
import { SubscribeButton } from "../components/SubsCribeButton"
import styles from "./home.module.scss"
import { GetServerSideProps, GetStaticProps } from "next"
import { stripe } from "../services/stripe"

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {

  return (
    <>
      <Head>
        <title>Home | Ig News</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, Welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1KhHz1J9SaRsKHv6DCKEf2h3", {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("pt-BR", {
      style: 'currency',
      currency: "BRL"
    }).format(price.unit_amount / 100)

  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24  //24 hours
  }
}
