import React, { useEffect, useState } from "react";
import './ArtistPage.css';
import singleArtistData from "../singleArtistData";

import AlbumContainer from "../AlbumContainer/AlbumContainer";

let artistImage;

const ArtistPage = ({ artistID, likedAlbums, saveAlbum }) => {

    const [loading, setLoading] = useState(true);
    const [artistData, setArtistData] = useState({});
    const [usersLikedAlbumsFromArtist, setUsersLikedAlbumsFromArtist] = useState([]);

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:8000/api/v1/artist/${artistID}`)
            .then(res => res.json())
            .then(data => {
                setArtistData(data);
                setLoading(false);
                artistImage = data.artistInfo.artistImage;
                if (artistImage.includes('background')) {
                    artistImage = artistImage.substring(23, singleArtistData.artistImage.length - 3);
                }
            })

    }, [artistID]);

    useEffect(() => {
        if (likedAlbums) {
            const albums = likedAlbums.filter(album => album.artistID === artistID);
            setUsersLikedAlbumsFromArtist(albums);
        } else {
            setUsersLikedAlbumsFromArtist([]);
        }
    }, [likedAlbums]);

    if (!loading) {
        return (
            <div>
                <div 
                    className="artist-heading"
                    style={{backgroundImage: `url(${artistImage})`}}
                >
                    <h2>{artistData.artistInfo.artistName}</h2>
                </div>
                <AlbumContainer 
                    albumData={artistData.artistInfo.albums} 
                    artistID={artistID}
                    artistName={artistData.artistInfo.artistName}
                    likedAlbums={usersLikedAlbumsFromArtist}
                    saveAlbum={saveAlbum}
                />
            </div>
        )
    } else {
        return (
            <h2>-- LOADING --</h2>
        )
    }


}

export default ArtistPage;