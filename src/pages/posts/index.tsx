
import Head from "next/head"
import styles from "./styles.module.scss"

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
