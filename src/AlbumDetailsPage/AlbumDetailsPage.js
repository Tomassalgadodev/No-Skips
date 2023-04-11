import React, { useEffect, useState } from "react";
import './AlbumDetailsPage.css';

import LoadingAlbumDetailsPage from "../LoadingAlbumDetailsPage/LoadingAlbumDetailsPage";
import AlbumDetailsHeader from "../AlbumDetailsHeader/AlbumDetailsHeader";
import SongContainer from "../SongContainer/SongContainer";

const AlbumDetailsPage = ({ albumID, likedAlbums, saveAlbum, removeAlbum, loggedIn, logoutUser }) => {

    // const [trackData, setTrackData] = useState({});

    const [albumData, setAlbumData] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingSinglesData, setLoadingSinglesData] = useState(true);
    const [albumArt, setAlbumArt] = useState('');
    const [albumColor, setAlbumColor] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [yearReleased, setYearReleased] = useState('');
    const [link, setLink] = useState('');
    const [artistName, setArtistName] = useState('');
    const [artistID, setArtistID] = useState('');
    const [artistSinglesData, setArtistSinglesData] = useState({});
    const [singlesByArtist, setSinglesByArtist] = useState([]);
    const [numberOfSongs, setNumberOfSongs] = useState(0);
    const [totalStreams, setTotalStreams] = useState(0);
    const [lowestStreams, setLowestStreams] = useState(0);
    const [albumHasSingles, setAlbumHasSingles] = useState(false);
    const [totalStreamsWithoutSingles, setTotalStreamsWithoutSingles] = useState(0);
    const [lowestStreamsWithoutSingles, setLowestStreamsWithoutSingles] = useState(0);
    const [singlesDataCalculated, setSinglesDataCalculated] = useState(false);
    const [albumIsLiked, setAlbumIsLiked] = useState(false);
    const [previouslyLikedSongs, setPreviouslyLikedSongs] = useState([]);
    const [likedSongs, setLikedSongs] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [hasEditedSongs, setHasEditedSongs] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoModalMessage, setInfoModalMessage] = useState('Album added to your collection');
    const [fadeOut, setFadeOut] = useState(false);

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

    const getTotalStreams = tracks => Math.max(...tracks.map(track => parseInt(track.track.playcount)));

    const getLowestStreams = tracks => Math.min(...tracks.map(track => parseInt(track.track.playcount)));

    const getSingleNames = singles => singles.map(single => single.releases.items[0].name);

    const getNonSingleTracks = (tracks, singles) => tracks.filter(track => !singles.includes(track.track.name));

    const fetchSinglesData = async (artistID) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/artistSingleAndEpData/${artistID}`);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const artistSingleAndEpData = await response.json();

            const singlesByArtistData = getSingleNames(artistSingleAndEpData.data.artistUnion.discography.singles.items);

            setArtistSinglesData(artistSingleAndEpData);
            setSinglesByArtist(singlesByArtistData);
            setLoadingSinglesData(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    const fetchAlbumData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/album/${albumID}`);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const albumData = await response.json();

            const albumColorHex = albumData.data.albumUnion.coverArt.extractedColors.colorRaw.hex;

            if (albumColorHex) setAlbumColor(albumColorHex);

            setAlbumArt(albumData.data.albumUnion.coverArt.sources[0].url);
            setAlbumTitle(albumData.data.albumUnion.name);
            setYearReleased(albumData.data.albumUnion.date.isoString.substring(0, 4));
            setLink(albumLink);
            setArtistName(albumData.data.albumUnion.artists.items[0].profile.name);
            setArtistID(albumData.data.albumUnion.artists.items[0].id);
            fetchSinglesData(albumData.data.albumUnion.artists.items[0].id);
            setNumberOfSongs(albumData.data.albumUnion.tracks.totalCount);
            setTotalStreams(getTotalStreams(albumData.data.albumUnion.tracks.items));
            setLowestStreams(getLowestStreams(albumData.data.albumUnion.tracks.items));
            setAlbumData(albumData);
            // setTrackData(trackData);
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

    useEffect(() => {
        if (!loadingSinglesData) {
            const albumTracks = albumData.data.albumUnion.tracks.items;
            const nonSingleTracks = getNonSingleTracks(albumTracks, singlesByArtist);
            if (albumTracks.length !== nonSingleTracks.length) {
                const highestStreamsWithoutSingles = getTotalStreams(nonSingleTracks);
                const newLowestStreams = getLowestStreams(nonSingleTracks);
                setTotalStreamsWithoutSingles(highestStreamsWithoutSingles);
                setLowestStreamsWithoutSingles(newLowestStreams);
                setAlbumHasSingles(true);
            } else {
                setAlbumHasSingles(false);
            }
            setSinglesDataCalculated(true);
        }
    }, [loadingSinglesData]);

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

        albumData.data.albumUnion.tracks.items.forEach(track => {
            allSongs.push({ trackNumber: track.track.trackNumber, trackName: track.track.name, trackID: track.uid })
        });

        setLikedSongs(allSongs);
        return allSongs;
    }

    const removeAllSongs = () => {
        setLikedSongs([]);
    }

    const submitAlbum = async () => {
        const albumObject = { albumArt, albumTitle, yearReleased, link, artistName, artistID, albumID, likedSongs: JSON.stringify(likedSongs)};

        let albumScore = (likedSongs.length / numberOfSongs) * 100;

        if (albumScore % 1) { albumScore = albumScore.toFixed(1) }
        
        albumScore = albumScore + '%';

        // Add this to the album object and save it. Display the score if the album is liked

        console.log(albumScore);

        const result = await saveAlbum([albumObject, albumColor]);
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

    const submitAlbumWithTracks = async (tracksToAdd) => {
        const albumObject = { albumArt, albumTitle, yearReleased, link, artistName, artistID, albumID, likedSongs: JSON.stringify(tracksToAdd)};

        let albumScore = (likedSongs.length / numberOfSongs) * 100;

        if (albumScore % 1) { albumScore = albumScore.toFixed(1) }
        
        albumScore = albumScore + '%';

        // Add this to the album object and save it. Display the score if the album is liked

        console.log(albumScore);
        
        const result = await saveAlbum([albumObject, albumColor]);
        if (result === 'Success!') {
            setAlbumIsLiked(true);
            setPreviouslyLikedSongs(likedSongs);
            setHasEditedSongs(false);
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 1000);
            return 'Success!';
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

    const displayInfoModal = (message) => {
        setInfoModalMessage(message);
        setShowInfoModal(true);
        setTimeout(() => {
            setFadeOut(true);
        }, 3000);
        setTimeout(() => {
            setShowInfoModal(false);
            setFadeOut(false);
        }, 3500);
    }

    const handleRemoveAlbum = async () => {
        const result = await removeAlbum({ link: albumLink });
        if (result === 'Successfully removed') {
            displayInfoModal('Album removed from your collection');
            setAlbumIsLiked(false);
            setLikedSongs([]);
            setPreviouslyLikedSongs([]);
        } else {
            console.log('Something went wrong');
        }
    }

    return (
        <React.Fragment>
            {loading && <LoadingAlbumDetailsPage />}
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
                        submitAlbumWithTracks={submitAlbumWithTracks}
                        displayInfoModal={displayInfoModal}
                    />
                    <SongContainer 
                        albumData={albumData} 
                        addLikedSong={addLikedSong}
                        removeLikedSong={removeLikedSong}
                        previouslyLikedSongs={previouslyLikedSongs}
                        likedSongs={likedSongs}
                        totalStreams={totalStreams}
                        lowestStreams={lowestStreams}
                        loadingSinglesData={loadingSinglesData}
                        totalStreamsWithoutSingles={totalStreamsWithoutSingles}
                        lowestStreamsWithoutSingles={lowestStreamsWithoutSingles}
                        albumHasSingles={albumHasSingles}
                        singlesByArtist={singlesByArtist}
                        displayInfoModal={displayInfoModal}
                        singlesDataCalculated={singlesDataCalculated}
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
                            <button className="album-submit-button" style={{ backgroundColor: '#1DB954', color: '#181818' }}>Saved!</button>
                        }
                        {albumIsLiked && hasEditedSongs &&
                            <button 
                                onClick={replaceAlbum}
                                className="album-submit-button"
                            >Edit album</button>
                        }
                    </div>
                    {showInfoModal && 
                                <div className={fadeOut ? "info-modal info-modal-fadeout" : "info-modal"}>{infoModalMessage}</div>
                    }
                </React.Fragment>}
        </React.Fragment>
    )
}

export default AlbumDetailsPage;