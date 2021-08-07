import { useEffect, useState } from "react";
import axios from 'axios';
import { spotifyNowURL, geniusWebApiURL, geniusSearchURL, geniusSongURL, geniusWebURL } from '../constants/'
import Router from 'next/router'
import useSWR from 'swr'
import Lyrics from "./lyrics";

export default function app() {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
    const [isPodcast, setIsPodcast] = useState(false);
    const [currentArtist, setCurrentArtist] = useState('');
    const [currentTrack, setCurrentTrack] = useState('');
    const [geniusToken, setGeniusToken] = useState('');
    const [geniusLink, setGeniusLink] = useState('');


    async function getTrack(spotifyToken) {
        let reqString = spotifyNowURL + spotifyToken
        const result = await (await fetch(reqString)).json();
        setCurrentlyPlaying(result.is_playing);
        if (result.currently_playing_type != 'episode') {
            setIsPodcast(false);
            setCurrentArtist(result.item.artists[0].name);
            setCurrentTrack(result.item.name);
        } else {
            setIsPodcast(true);
        }
    }

    function handleGeniusClick() {
        document.location = geniusWebApiURL;
    }

    function getGeniusToken() {
        let url = window.location.href;
        if (url.indexOf('_token') > -1) {
            let geniusToken = url.split('_token=')[1].split("&")[0].trim();
            setGeniusToken(geniusToken);
            localStorage.setItem('geniusToken', geniusToken);
        }
    }

    function getSpotifyToken() {
        let spotifyToken = localStorage.getItem('spotifyToken');
        return spotifyToken;
    }

    async function getLyricsClick() {
        let reqString = `${geniusSearchURL}${currentTrack}%20${currentArtist}&access_token=${geniusToken}`;
        let result = await (await fetch(reqString)).json();
        let songPath = result.response.hits[0].result.api_path
        reqString = `${geniusSongURL}${songPath}?access_token=${geniusToken}`;
        result = await (await fetch(reqString)).json();
        let finalSongPath = result.response.song.path;
        let finalGeniusLink = `${geniusWebURL}${finalSongPath}`;
        setGeniusLink(finalGeniusLink);
    }


    useEffect(() => {
        getGeniusToken();
        let spotifyToken = getSpotifyToken();
        getTrack(spotifyToken);
    }, []);

    useEffect(() => {


    }, [geniusLink])

return (
    <div>
        {currentlyPlaying
            ? <h2>You are listening to</h2>
            : <h2>You are not listening to anything</h2>
        }
        {currentlyPlaying && !isPodcast && <div><h2> {currentArtist + ' - ' + currentTrack} </h2></div>}

        {currentlyPlaying && isPodcast && <h2> an episode of a podcast </h2>}

        {geniusToken
        ? <button onClick={() => getLyricsClick()}>Get Lyrics</button>
        :<button onClick={() => handleGeniusClick()}>Connect to Genius</button>
        }
        
        <Lyrics path={geniusLink}/>

    </div>);

}
