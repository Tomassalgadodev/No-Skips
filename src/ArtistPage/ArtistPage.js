import React, { useEffect, useState } from "react";
import './ArtistPage.css';
import singleArtistData from "../singleArtistData";

import AlbumContainer from "../AlbumContainer/AlbumContainer";
import ArtistLoadingPage from "../ArtistLoadingPage/ArtistLoadingPage";

let artistImage;

const ArtistPage = ({ artistID, likedAlbums, saveAlbum, removeAlbum }) => {

    const [loading, setLoading] = useState(true);
    const [artistData, setArtistData] = useState({});
    const [usersLikedAlbumsFromArtist, setUsersLikedAlbumsFromArtist] = useState([]);

    const fetchArtistData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/artist/${artistID}`);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const data = await response.json();

            if (data.artistInfo.errorMsg) {
                setArtistData({ errorMsg: data.artistInfo.errorMsg })
                return;
            }

            setArtistData(data);
            setLoading(false);
            artistImage = data.artistInfo.artistImage;
            if (artistImage.includes('background')) {
                artistImage = artistImage.substring(23, singleArtistData.artistImage.length - 3);
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchArtistData();
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
                <div className="heading-container">
                    <div 
                        className="artist-heading"
                        style={{backgroundImage: `url(${artistImage})`}}
                    >
                    </div>
                    <h2 className="artist-page-title">{artistData.artistInfo.artistName}</h2>
                </div>
                <AlbumContainer 
                    albumData={artistData.artistInfo.albums} 
                    artistID={artistID}
                    artistName={artistData.artistInfo.artistName}
                    likedAlbums={usersLikedAlbumsFromArtist}
                    saveAlbum={saveAlbum}
                    removeAlbum={removeAlbum}
                />
            </div>
        )
    } else if (artistData.errorMsg === 'Not verified') {
        return (
            <h2>-- This Artist Is Not Verified --</h2>
        )
    } else if (artistData.errorMsg === `Artist doesn't exist`) {
        return (
            <h2>-- 404: No Artist With This ID --</h2>
        )
    } else {
        return (
            <ArtistLoadingPage />
        )
    }


}

export default ArtistPage;