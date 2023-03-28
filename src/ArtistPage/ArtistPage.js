import React, { useEffect, useState } from "react";
import './ArtistPage.css';
import singleArtistData from "../singleArtistData";

import AlbumContainer from "../AlbumContainer/AlbumContainer";
import ArtistLoadingPage from "../ArtistLoadingPage/ArtistLoadingPage";

let artistImage;

const ArtistPage = ({ artistID, likedAlbums, saveAlbum, removeAlbum }) => {

    const [loading, setLoading] = useState(true);
    const [artistData, setArtistData] = useState({});
    const [hasPopularReleases, setHasPopularReleases] = useState(false);
    const [hasAlbums, setHasAlbums] = useState(false);
    const [hasSingles, setHasSingles] = useState(false);
    const [usersLikedAlbumsFromArtist, setUsersLikedAlbumsFromArtist] = useState([]);

    // const fetchArtistData = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:8000/api/v1/artist/${artistID}`);

    //         if (!response.ok) {
    //             throw new Error(response.status);
    //         }

    //         const data = await response.json();

    //         if (data.artistInfo.errorMsg) {
    //             setArtistData({ errorMsg: data.artistInfo.errorMsg })
    //             return;
    //         }

    //         setArtistData(data);
    //         setLoading(false);
    //         artistImage = data.artistInfo.artistImage;
    //         if (artistImage.includes('background')) {
    //             artistImage = artistImage.substring(23, singleArtistData.artistImage.length - 3);
    //         }

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const fetchArtistData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/artistData/${artistID}`);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const data = await response.json();

            data.data.artistUnion.discography.popularReleasesAlbums.totalCount > 0 && setHasPopularReleases(true);
            data.data.artistUnion.discography.albums.totalCount > 0 && setHasAlbums(true);
            data.data.artistUnion.discography.singles.totalCount > 0 && setHasSingles(true);

            setArtistData(data);
            setLoading(false);

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
                        style={{backgroundImage: `url(${artistData.data.artistUnion.visuals.headerImage.sources[0].url})`}}
                    >
                    </div>
                    <h2 className="artist-page-title">{artistData.data.artistUnion.profile.name}</h2>
                </div>
                {hasPopularReleases &&
                <AlbumContainer 
                    heading="Popular Releases"
                    albumData={artistData.data.artistUnion.discography.popularReleasesAlbums} 
                    artistID={artistID}
                    artistName={artistData.data.artistUnion.profile.name}
                    likedAlbums={usersLikedAlbumsFromArtist}
                    saveAlbum={saveAlbum}
                    removeAlbum={removeAlbum}
                />}
                {hasAlbums &&
                <AlbumContainer 
                    heading="Albums"
                    albumData={artistData.data.artistUnion.discography.albums} 
                    artistID={artistID}
                    artistName={artistData.data.artistUnion.profile.name}
                    likedAlbums={usersLikedAlbumsFromArtist}
                    saveAlbum={saveAlbum}
                    removeAlbum={removeAlbum}
                />}
                {hasSingles && 
                    <AlbumContainer 
                        heading="Singles and EPs"
                        albumData={artistData.data.artistUnion.discography.singles} 
                        artistID={artistID}
                        artistName={artistData.data.artistUnion.profile.name}
                        likedAlbums={usersLikedAlbumsFromArtist}
                        saveAlbum={saveAlbum}
                        removeAlbum={removeAlbum}
                    />
                }
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