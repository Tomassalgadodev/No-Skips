import React from "react";
import './AlbumContainer.css'

import AlbumCard from "../AlbumCard/AlbumCard";
import { useHistory } from "react-router-dom";

const AlbumContainer = ({ heading, albumData, artistID, artistName, likedAlbums, saveAlbum, removeAlbum, discography, spotifyAccessToken, showAll }) => {

    const history = useHistory();

    const extractDuplicates = releases => {
        const withoutDuplicates = [];
        releases.forEach(release => {
            if (!withoutDuplicates.some(album => album.name.toLowerCase() === release.name.toLowerCase() && album.release_date === release.release_date)) {
                withoutDuplicates.push(release);
            }
        });
        return withoutDuplicates;
    }
    
    albumData = extractDuplicates(albumData);

    console.log(albumData);

    if (!showAll) albumData = albumData.slice(0, 5);

    const albumCards = albumData.map((album, index) => {

            const albumLink = `https://open.spotify.com/album/${album.id}`;
    
            const isLiked = likedAlbums.find(likedAlbum => likedAlbum.link === albumLink);

            let likedSongs;

            if (isLiked) {
                likedSongs = JSON.parse(isLiked.likedSongs);
            }

            return (
                <AlbumCard 
                    albumArt={album.images[0].url}
                    albumTitle={album.name}
                    yearReleased={album.release_date.substring(0, 4)}
                    link={albumLink}
                    key={index}
                    isLiked={isLiked ? true : false}
                    artistName={artistName}
                    artistID={artistID}
                    saveAlbum={saveAlbum}
                    removeAlbum={removeAlbum}
                    albumID={album.id}
                    spotifyAccessToken={spotifyAccessToken}
                    previouslyLikedSongs={likedSongs}
                    numberOfSongs={album.total_tracks}
                />
            )
        });

    return (
        <div className="dashboard-container">
            <h1 className="heading">{heading}</h1>
            {heading === 'Albums' && !discography &&
                <button 
                    className="see-discography"
                    onClick={() => history.push(`/albums/${artistName}/${artistID}`)}
                >See all albums</button>}
            {heading === 'Singles and EPs' && 
                <button 
                    className="see-discography"
                    onClick={() => history.push(`/singles/${artistName}/${artistID}`)}
                >See all singles</button>}
            <div className="saved-album-container">
                {albumCards}
            </div>
        </div>
    )
}

export default AlbumContainer;