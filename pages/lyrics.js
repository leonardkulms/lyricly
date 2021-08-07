import { useEffect, useState } from 'react';

const fetcher = async (url) => await fetch(url).then((res) => res.json())

export default function Lyrics(props) {

    const [lyrics, setLyrics] = useState(null);
    
    useEffect(() => {
        const setUp = async () => {
            let path = props.path;
            let res = await fetcher(`/api/hello?q=${path}`);
            setLyrics(res.text);
        }
        setUp();
    }, [props.path] );

    if(lyrics)return(<div>{lyrics}</div>);

    return null;
}