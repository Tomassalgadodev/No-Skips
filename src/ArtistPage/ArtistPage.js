import React, { useEffect, useState } from "react";
import './ArtistPage.css';
import singleArtistData from "../singleArtistData";

import AlbumContainer from "../AlbumContainer/AlbumContainer";

let artistImage;

const ArtistPage = ({ artistID }) => {

    const [loading, setLoading] = useState(true);
    const [artistData, setArtistData] = useState({});

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:8000/api/v1/artist/${artistID}`)
            .then(res => res.json())
            .then(data => {
                setArtistData(data);
                setLoading(false);
                artistImage = data.artistInfo.artistImage.substring(23, singleArtistData.artistImage.length - 3);
            })

    }, [artistID]);

    if (!loading) {
        return (
            <div>
                <div 
                    className="artist-heading"
                    style={{backgroundImage: `url(${artistImage})`}}
                >
                    <h2>{artistData.artistInfo.artistName}</h2>
                    {/* <img className="artist-image" src={artistImage}/> */}
                </div>
                <AlbumContainer albumData={artistData.artistInfo.albums} />
            </div>
        )
    } else {
        return (
            <h2>-- LOADING --</h2>
        )
    }


}

export default ArtistPage;