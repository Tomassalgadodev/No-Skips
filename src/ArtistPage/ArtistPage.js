import React, { useEffect, useState } from "react";
import './ArtistPage.css';
import singleArtistData from "../singleArtistData";

import AlbumContainer from "../AlbumContainer/AlbumContainer";
import ArtistLoadingPage from "../ArtistLoadingPage/ArtistLoadingPage";

import { getArtistData } from "../fetchRequests";

let artistImage;

const ArtistPage = ({ artistID, likedAlbums, saveAlbum, removeAlbum, loggedIn, spotifyAccessToken }) => {

    const [loading, setLoading] = useState(true);
    const [artistData, setArtistData] = useState({});
    const [usersLikedAlbumsFromArtist, setUsersLikedAlbumsFromArtist] = useState([]);
    const [isLoadingSpotifyData, setIsLoadingSpotifyData] = useState(true);
    const [artistName, setArtistName] = useState('');
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [artistSingles, setArtistSingles] = useState([]);

    // RENAME TO FETCH ARTIST HEADER IMAGE

    const fetchArtistData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/artistData/${artistID}`);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const data = await response.json();

            setArtistData(data);
            setLoading(false);

        } catch (err) {
            console.log(err.message);
        }
    }

    const fetchArtistDataFromSpotifyApi = async () => {
        try {
            const data = await getArtistData(artistID, spotifyAccessToken);

            if (typeof data === 'string') {
                throw new Error(data);
            }

            const albums = data[1].items.filter(release => release.album_group === 'album' && release.album_type === 'album');
            const singles = data[1].items.filter(release => release.album_group === 'single' && release.album_type === 'single');

            setArtistName(data[0].name);
            setArtistAlbums(albums);
            setArtistSingles(singles);
            setIsLoadingSpotifyData(false);

        } catch (err) {
            if (err.message === '400') {

                // Handle case where there isnt an artist with a given id
                console.log('no artist with that id');
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchArtistData();
        fetchArtistDataFromSpotifyApi();
    }, [artistID]);

    useEffect(() => {
        if (likedAlbums) {
            const albums = likedAlbums.filter(album => album.artistID === artistID);
            setUsersLikedAlbumsFromArtist(albums);
        } else {
            setUsersLikedAlbumsFromArtist([]);
        }
    }, [likedAlbums]);

    if (!isLoadingSpotifyData && !loading) {
        return (
            <div>
                <div className="heading-container">
                    <div 
                        className="artist-heading"
                        style={{backgroundImage: `url(${artistData.data.artistUnion.visuals.headerImage.sources[0].url})`}}
                    >
                    </div>
                    <h2 className="artist-page-title">{artistData.data.artistUnion.profile.name}</h2>
                </div>
                {artistAlbums.length > 0 && 
                        <AlbumContainer 
                            heading="Albums"
                            albumData={artistAlbums}
                            artistID={artistID}
                            artistName={artistName}
                            likedAlbums={usersLikedAlbumsFromArtist}
                            saveAlbum={saveAlbum}
                            removeAlbum={removeAlbum}
                            spotifyAccessToken={spotifyAccessToken}
                        />
                    }
                    {artistSingles.length > 0 &&
                        <AlbumContainer 
                            heading="Singles and EPs"
                            albumData={artistSingles}
                            artistID={artistID}
                            artistName={artistName}
                            likedAlbums={usersLikedAlbumsFromArtist}
                            saveAlbum={saveAlbum}
                            removeAlbum={removeAlbum}
                            spotifyAccessToken={spotifyAccessToken}
                        />
                    }
            </div>
        )
        } else if (!isLoadingSpotifyData && loading) {
            return (
                <div>
                    <div className="heading-container">
                        <div 
                            className="fake-artist-heading"
                        >
                        </div>
                        <h2 className="artist-page-title">{artistName}</h2>
                    </div>
                    {artistAlbums.length > 0 && 
                        <AlbumContainer 
                            heading="Albums"
                            albumData={artistAlbums}
                            artistID={artistID}
                            artistName={artistName}
                            likedAlbums={usersLikedAlbumsFromArtist}
                            saveAlbum={saveAlbum}
                            removeAlbum={removeAlbum}
                            spotifyAccessToken={spotifyAccessToken}
                        />
                    }
                    {artistSingles.length > 0 &&
                        <AlbumContainer 
                            heading="Singles and EPs"
                            albumData={artistSingles}
                            artistID={artistID}
                            artistName={artistName}
                            likedAlbums={usersLikedAlbumsFromArtist}
                            saveAlbum={saveAlbum}
                            removeAlbum={removeAlbum}
                            spotifyAccessToken={spotifyAccessToken}
                        />
                    }
                </div>
            )
        } else if (isLoadingSpotifyData && loading) {
            <ArtistLoadingPage />
        }
    // } else if (artistData.errorMsg === 'Not verified') {
    //     return (
    //         <h2>-- This Artist Is Not Verified --</h2>
    //     )
    // } else if (artistData.errorMsg === `Artist doesn't exist`) {
    //     return (
    //         <h2>-- 404: No Artist With This ID --</h2>
    //     )
    // } else {
    //     return (
    //         <ArtistLoadingPage />
    //     )
    // }


}

export default ArtistPage;