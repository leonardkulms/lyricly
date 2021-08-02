import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { spotifyWebApiURL } from '../constants/'
import Router from 'next/router'

export default function Home() {
  const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
  const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

  const [accessToken, setAccessToken] = useState('');

  function handleClick() {
    document.location = spotifyWebApiURL
  }

  function setToken() {
    let url = window.location.href;
    if (url.indexOf('_token') > -1) {
      setAccessToken(url.split('_token=')[1].split("&")[0].trim())
    }
  }

  useEffect(() => {
    setToken();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Lyricly</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        token: {accessToken}
        <h1 className={styles.title}>
          Lyricly
        </h1>
        <button onClick={() => handleClick()}>
          Connect to Spotify
        </button>
        <button onClick={event => Router.push({
          pathname: '/app',
          query: { accessToken }
        })}
          className="">
          {accessToken !== '' ? 'Go To Your Current Lyrics' : 'Login'}
        </button>

      </main>

    </div>
  )
}
