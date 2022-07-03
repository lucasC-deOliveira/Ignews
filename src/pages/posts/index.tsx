
import { GetStaticProps } from "next"
import Head from "next/head"
import { getPrismicClient } from "../../services/prismic"
import styles from "./styles.module.scss"
import Prismic from "@prismicio/client"

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a>
            <time>
              03 de junho de 2022
            </time>
            <strong>
              lorem ipsum
            </strong>
            <p>
              fjd fdafdsa fdksafad dakfdkas dfajfdkasf dfajkdsfs fdjsafkdsaf dfjafdjkasfj
            </p>
          </a>

          <a>
            <time>
              03 de junho de 2022
            </time>
            <strong>
              lorem ipsum
            </strong>
            <p>
              fjd fdafdsa fdksafad dakfdkas dfajfdkasf dfajkdsfs fdjsafkdsaf dfjafdjkasfj
            </p>
          </a>

          <a>
            <time>
              03 de junho de 2022
            </time>
            <strong>
              lorem ipsum
            </strong>
            <p>
              fjd fdafdsa fdksafad dakfdkas dfajfdkasf dfajkdsfs fdjsafkdsaf dfjafdjkasfj
            </p>
          </a>
        </div>
      </main>
    </>
  )

}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.predicates.at('document.type', "publication"),
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100
  })
  
  console.log(JSON.stringify(response,null,2))

  return {
    props: {

    }
  }
}