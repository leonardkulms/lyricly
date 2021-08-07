import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react';
import { spotifyWebApiURL } from '../constants/'
import Router from 'next/router'

export default function Home() {

  function handleSpotifyClick() {
    document.location = spotifyWebApiURL
  }

  function getSpotifyToken() {
    let url = window.location.href;
    if (url.indexOf('_token') > -1) {
      let spotifyToken = url.split('_token=')[1].split("&")[0].trim()
      localStorage.setItem('spotifyToken', spotifyToken)
      Router.push('/app');
    }
  }
    
  useEffect(() => {
    getSpotifyToken();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Lyricly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Lyricly
        </h1>
        <button onClick={() => handleSpotifyClick()}>
          Connect to Spotify
        </button>
      </main>

    </div>
  )
}
