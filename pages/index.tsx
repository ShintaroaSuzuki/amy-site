import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import MailForm from '../components/MailForm'
import Gallery from '../components/Gallery'
import Loading from '../components/Loading'
import AutoplayVideo from '../components/AutoplayVideo'

const Home: NextPage = () => {
  const [ loading, setLoading ] = useState<Boolean>(true)
  const time = useRef<Date>(new Date())

  const handleLoading = (start: Date | undefined) => {
    if (!start) return
    
    const now = new Date()
    const timeDiff = now.getTime() - start.getTime()

    if (timeDiff > 1200) {
      setLoading(false)
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 1200 - timeDiff)
    }
  }
  
  useEffect(() => {
    time.current = new Date()
    window.addEventListener("load", () => handleLoading(time.current), { passive: true })
  })
 
  return (
    <div className={styles.container}>
      <Head>
        <title>えーみーる</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles["main"]}>
        {loading && <Loading />}
        <Header loading={loading} />
        {/* 
        <div className={loading ? styles["video-conteiner-loaded"] : styles["video-container"]}>
          <video playsInline autoPlay loop muted className={styles["background-video"]} >
            <source src="background.mp4" type="video/mp4" />
          </video>
        </div>
        */}
        <AutoplayVideo videoUrl="background.mp4" loading={loading}/>
        <Gallery 
          loading={loading}
          works={
            [
              { imageUrl: "/work1.jpg", title: "泣いてる私も面倒臭がらずに愛してよ" },
              { imageUrl: "/work2.jpg", title: "死んでるみたいに生きている" },
              { imageUrl: "/work3.jpg", title: "もう良い子じゃないよ" },
              { imageUrl: "/work4.jpg", title: "君のためになんか死んでやらない" },
            ]
          }
        />
        <MailForm loading={loading} />
      </main>

      {/*
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
      */}
    </div>
  )
}

export default Home
