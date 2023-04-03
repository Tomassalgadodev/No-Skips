import React, { useEffect, useState } from "react";
import './AlbumDetailsPage.css';

import AlbumDetailsHeader from "../AlbumDetailsHeader/AlbumDetailsHeader";
import SongContainer from "../SongContainer/SongContainer";

const AlbumDetailsPage = ({ albumID, likedAlbums, saveAlbum, removeAlbum, loggedIn, logoutUser }) => {

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
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [hasEditedSongs, setHasEditedSongs] = useState(false);

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
            setLikedSongs(likedAlbum ? JSON.parse(likedAlbum.likedSongs) : []);
    
        } catch (err) {
            if (err.message === '401') {
                logoutUser();
            }
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
            console.log(err.message);
        }
    }

    useEffect(() => {   
        fetchSavedAlbumData();
        fetchAlbumData();
    }, []);

    useEffect(() => {
        if (JSON.stringify(previouslyLikedSongs.sort((a, b) => a.trackNumber - b.trackNumber)) === JSON.stringify(likedSongs.sort((a, b) => a.trackNumber - b.trackNumber))) {
            setHasEditedSongs(false);
        } else {
            setHasEditedSongs(true);
        }
    }, [likedSongs]);

    const addLikedSong = likedSong => {
        if (!likedSongs.some(song => song.trackID === likedSong.trackID)) {
            setLikedSongs([...likedSongs, likedSong]);
        }
    }

    const removeLikedSong = unLikedSong => {
        setLikedSongs(likedSongs.filter(song => song.trackID !== unLikedSong.trackID));
    }

    const likeAllSongs = () => {
        const allSongs = [];

        trackData.data.albumUnion.tracks.items.forEach(track => {
            allSongs.push({ trackNumber: track.track.trackNumber, trackName: track.track.name, trackID: track.uid })
        });

        setLikedSongs(allSongs);
    }

    const removeAllSongs = () => {
        setLikedSongs([]);
    }

    const submitAlbum = async () => {
        const albumObject = { albumArt, albumTitle, yearReleased, link, artistName, artistID, albumID, likedSongs: JSON.stringify(likedSongs)};
        const result = await saveAlbum(albumObject);
        if (result === 'Success!') {
            setAlbumIsLiked(true);
            setPreviouslyLikedSongs(likedSongs);
            setHasEditedSongs(false);
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 1000);
        } else if (result === 'Already liked') {
            console.log('already liked')
        } else {
            console.log('Error');
        }
    }

    const replaceAlbum = async () => {
        const result = await removeAlbum({ link: albumLink });
        if (result === 'Successfully removed') {
            submitAlbum();
        } else {
            console.log('Something went wrong');
        }
    }

    const handleRemoveAlbum = async () => {
        const result = await removeAlbum({ link: albumLink });
        if (result === 'Successfully removed') {
            setAlbumIsLiked(false);
            setLikedSongs([]);
            setPreviouslyLikedSongs([]);
        } else {
            console.log('Something went wrong');
        }
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
                        albumIsLiked={albumIsLiked}
                        likeAllSongs={likeAllSongs}
                        removeAllSongs={removeAllSongs}
                        handleRemoveAlbum={handleRemoveAlbum}
                    />
                    <SongContainer 
                        trackData={trackData} 
                        addLikedSong={addLikedSong}
                        removeLikedSong={removeLikedSong}
                        previouslyLikedSongs={previouslyLikedSongs}
                        likedSongs={likedSongs}
                    />
                    <div className="album-submit-button-container">
                        <p className="album-release-date">{albumData.data.albumUnion.label}</p>
                        <p className="record-label1">{albumData.data.albumUnion.copyright.items[0].text}</p>
                        {/* <p className="record-label2">{albumData.data.albumUnion.copyright.items[1] ? albumData.data.albumUnion.copyright.items[1].text : albumData.data.albumUnion.copyright.items[0].text}</p> */}
                        {!albumIsLiked && 
                            <button 
                                onClick={submitAlbum} 
                                className="album-submit-button"
                            >Submit album</button>
                        }
                        {showSuccessMessage &&
                            <button className="album-submit-button" style={{ backgroundColor: '#1DB954', color: '#181818' }}>Success!</button>
                        }
                        {albumIsLiked && hasEditedSongs &&
                            <button 
                                onClick={replaceAlbum}
                                className="album-submit-button"
                            >Edit album</button>
                        }
                    </div>
                    {/* <button onClick={() => removeAlbum({ link: albumLink})}>Remove</button> */}
                </React.Fragment>}
        </React.Fragment>
    )
}

export default AlbumDetailsPage;