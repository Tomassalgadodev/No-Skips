import React, { useEffect, useState } from "react";
import './AlbumDetailsPage.css';

import AlbumDetailsHeader from "../AlbumDetailsHeader/AlbumDetailsHeader";
import SongContainer from "../SongContainer/SongContainer";

const AlbumDetailsPage = ({ albumID, likedAlbums, saveAlbum, removeAlbum, loggedIn, fetchUserAlbumData }) => {

    const [albumData, setAlbumData] = useState({});
    const [trackData, setTrackData] = useState({});
    const [loading, setLoading] = useState(true);
    const [albumArt, setAlbumArt] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [yearReleased, setYearReleased] = useState('');
    const [link, setLink] = useState('');
    const [artistName, setArtistName] = useState('');
    const [artistID, setArtistID] = useState('');
    const [albumIsLiked, setAlbumIsLiked] = useState(false);
    const [previouslyLikedSongs, setPreviouslyLikedSongs] = useState([]);
    const [likedSongs, setLikedSongs] = useState([]);

    const albumLink = `https://open.spotify.com/album/${albumID}`;

    const fetchSavedAlbumData = async () => {
        try {
            const fetchAlbumAttempt = await fetch('http://localhost:8000/api/v1/savedAlbums', {
            credentials: 'include'
            })
    
            if(!fetchAlbumAttempt.ok) {
            throw new Error(fetchAlbumAttempt.status);
            }
    
            const data = await fetchAlbumAttempt.json();
    
            const likedAlbum = data.find(album => album.link === albumLink);
            setAlbumIsLiked(likedAlbum ? true : false);
            setPreviouslyLikedSongs(likedAlbum ? JSON.parse(likedAlbum.likedSongs) : []);
    
        } catch (err) {
            console.log(err);
        }
    }

    const fetchAlbumData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/album/${albumID}`);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const [albumData, trackData] = await response.json();

            setAlbumArt(albumData.data.albumUnion.coverArt.sources[0].url);
            setAlbumTitle(albumData.data.albumUnion.name);
            setYearReleased(albumData.data.albumUnion.date.isoString.substring(0, 4));
            setLink(albumLink);
            setArtistName(albumData.data.albumUnion.artists.items[0].profile.name);
            setArtistID(albumData.data.albumUnion.artists.items[0].id);
            setAlbumData(albumData);
            setTrackData(trackData);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {   
        fetchSavedAlbumData();
        fetchAlbumData();
    }, [])

    const addLikedSong = likedSong => {
        if (!likedSongs.some(song => song.trackName === likedSong.trackName && song.trackNumber === likedSong.trackNumber)) {
            setLikedSongs([...likedSongs, likedSong]);
        }
    }

    const removeLikedSong = unLikedSong => {
        setLikedSongs(likedSongs.filter(song => song.trackName !== unLikedSong.trackName && song.trackNumber !== unLikedSong.trackNumber));
    }

    const submitAlbum = () => {
        const albumObject = { albumArt, albumTitle, yearReleased, link, artistName, artistID, albumID, likedSongs: JSON.stringify(likedSongs)};
        saveAlbum(albumObject);
    }

    return (
        <React.Fragment>
            {loading && <h1>-- Loading --</h1>}
            {!loading && 
                <React.Fragment>
                    <AlbumDetailsHeader 
                        albumImage={albumArt}
                        albumTitle={albumTitle}
                        artistThumbnail={albumData.data.albumUnion.artists.items[0].visuals.avatarImage.sources[1].url}
                        artistName={artistName}
                        artistID={albumData.data.albumUnion.artists.items[0].id}
                        albumType={albumData.data.albumUnion.type}
                        numberOfSongs={albumData.data.albumUnion.tracks.totalCount}
                        backgroundColor={albumData.data.albumUnion.coverArt.extractedColors.colorRaw.hex}
                        albumLength={''}
                        yearReleased={yearReleased}
                    />
                    <SongContainer 
                        trackData={trackData} 
                        addLikedSong={addLikedSong}
                        removeLikedSong={removeLikedSong}
                    />
                    <div className="album-submit-button-container">
                        <p className="album-release-date">{albumData.data.albumUnion.label}</p>
                        <p className="record-label1">{albumData.data.albumUnion.copyright.items[0].text}</p>
                        <p className="record-label2">{albumData.data.albumUnion.copyright.items[1].text}</p>
                        {!albumIsLiked && 
                            <button onClick={submitAlbum} className="album-submit-button">Submit album</button>
                        }
                        {albumIsLiked && 
                            <button onClick={submitAlbum} className="album-submit-button">Edit album</button>
                        }
                    </div>
                </React.Fragment>}
        </React.Fragment>
    )
}

export default AlbumDetailsPage;