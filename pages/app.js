import { useEffect, useState } from "react";
import { spotifyNowURL } from '../constants/'
import Router from 'next/router'

export default function app() {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
    const [isPodcast, setIsPodcast] = useState(false);
    const [currentArtist, setCurrentArtist] = useState('');
    const [currentTrack, setCurrentTrack] = useState('');

    async function getTrack(accessToken) {
        let reqString = spotifyNowURL + accessToken
        const res = await fetch(reqString);
        const result = await res.json();
        setCurrentlyPlaying(result.is_playing);
        if(result.currently_playing_type != 'episode') {
            setIsPodcast(false);
            setCurrentArtist(result.item.artists[0].name);
            setCurrentTrack(result.item.name);
        }else{
            setIsPodcast(true);
        }
      
        console.log(result)
    }

    useEffect(() => {
        let token;
        let url = window.location.href;
        if (url.indexOf('Token') > -1) {
            token = url.split('accessToken=')[1].split("&")[0].trim();
        }
        getTrack(token);
    }, [])


    return (
        <div>
            {currentlyPlaying
            ? <h2>You are listening to</h2> 
            : <h2>You are not listening to anything</h2>
            }
            {currentlyPlaying && !isPodcast && <h2> {currentArtist + ' - ' + currentTrack} </h2> }
            
            {currentlyPlaying && isPodcast && <h2> an episode of a podcast </h2> }
        </div>);
}