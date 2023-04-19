import React, { useEffect, useState } from "react";
import './AlbumDetailsPage.css';

import LoadingAlbumDetailsPage from "../LoadingAlbumDetailsPage/LoadingAlbumDetailsPage";
import AlbumDetailsHeader from "../AlbumDetailsHeader/AlbumDetailsHeader";
import SongContainer from "../SongContainer/SongContainer";

import { getSingleAlbumData, getArtistData } from "../fetchRequests";

const AlbumDetailsPage = ({ albumID, likedAlbums, saveAlbum, removeAlbum, loggedIn, logoutUser, spotifyAccessToken }) => {

    // const [trackData, setTrackData] = useState({});

    const [albumData, setAlbumData] = useState({});
    const [albumTracks, setAlbumTracks] = useState([]);
    const [isLoadingSpotifyData, setIsLoadingSpotifyData] = useState(true);
    const [loadingStreamingData, setLoadingStreamingData] = useState(true);
    const [streamingData, setStreamingData] = useState([]);
    const [loadingSinglesData, setLoadingSinglesData] = useState(true);
    const [albumArt, setAlbumArt] = useState('');
    const [albumColor, setAlbumColor] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [yearReleased, setYearReleased] = useState('');
    const [link, setLink] = useState('');
    const [artistName, setArtistName] = useState('');
    const [artistID, setArtistID] = useState('');
    const [albumType, setAlbumType] = useState('');
    const [artistThumbnail, setArtistThumbnail] = useState('');
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

    const getNonSingleTracks = (tracks, singles) => tracks.filter(track => !singles.includes(track.track.name));

    const fetchStreamingData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/album/${albumID}`);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const albumData = await response.json();

            const streamingData = albumData.data.albumUnion.tracks.items.map(track => track.track.playcount);

            setStreamingData(streamingData);
            setAlbumData(albumData);
            setTotalStreams(getTotalStreams(albumData.data.albumUnion.tracks.items));
            setLowestStreams(getLowestStreams(albumData.data.albumUnion.tracks.items));
            setLoadingStreamingData(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    const getAverageColor = (image) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const { width, height } = image;
        let r = 0;
        let g = 0;
        let b = 0;
      
        canvas.width = width;
        canvas.height = height;
      
        context.drawImage(image, 0, 0, width, height);
      
        const imageData = context.getImageData(0, 0, width, height);
        const data = imageData.data;
      
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
      
        const pixels = data.length / 4;
        const avgR = r / pixels;
        const avgG = g / pixels;
        const avgB = b / pixels;
      
        return `rgb(${avgR}, ${avgG}, ${avgB})`;
      }

    const getAlbumColor = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            await new Promise((resolve) => (img.onload = resolve));
            const avgColor = getAverageColor(img);
            return avgColor;
          } catch (error) {
            console.error(error);
          }
    }

    const getSinglesData = async (releases) => {

        const singles = [];
        const rawSingles = releases.items.filter(release => release.album_group === 'single' && release.album_type === 'single');

        for (let i = 0; i < rawSingles.length; i++) {
            if (rawSingles[i].total_tracks > 1) {
                try {
                    const data = await getSingleAlbumData(rawSingles[i].id, spotifyAccessToken);

                    if (typeof data === 'string') {
                        throw new Error(data);
                    }

                    const epTracks = data.tracks.items.map(track => track.name);

                    singles.push(...epTracks);
                } catch (err) {
                    console.log(err);
                }
            } else {
                singles.push(rawSingles[i].name);
            }
        }

        return singles;
    }

    const fetchAlbumData = async () => {
        try {
            const data = await getSingleAlbumData(albumID, spotifyAccessToken);
            const data2 = await getArtistData(data.artists[0].id, spotifyAccessToken);

            if (typeof data === 'string') {
                throw new Error(data);
            }

            if (typeof data2 === 'string') {
                throw new Error(data2);
            }

            const albumImage = data.images[2].url;

            const albumColor = await getAlbumColor(albumImage);
            const singles = await getSinglesData(data2[1]);

            setAlbumTracks(data.tracks.items);
            setAlbumColor(albumColor);
            setAlbumArt(data.images[0].url);
            setAlbumTitle(data.name);
            setYearReleased(data.release_date.substring(0, 4));
            setLink(albumLink);
            setArtistName(data.artists[0].name);
            setArtistID(data.artists[0].id);
            setArtistThumbnail(data2[0].images[2].url)
            setAlbumType(data.type.toUpperCase());
            setNumberOfSongs(data.total_tracks);
            setSinglesByArtist(singles);
            setIsLoadingSpotifyData(false);

            // console.log(data);
            // console.log(data2);
            // console.log(singles);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {   
        fetchSavedAlbumData();
        fetchStreamingData();
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
        if (!isLoadingSpotifyData && !loadingStreamingData) {

            const nonSingleTracks = getNonSingleTracks(albumData.data.albumUnion.tracks.items, singlesByArtist);

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
    }, [isLoadingSpotifyData, loadingStreamingData]);

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
        console.log(albumData);
        albumTracks.forEach(track => {
            allSongs.push({ trackNumber: track.track_number, trackName: track.name, trackID: track.id })
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
            {isLoadingSpotifyData && <LoadingAlbumDetailsPage />}
            {!isLoadingSpotifyData &&
                <React.Fragment>
                    <AlbumDetailsHeader 
                        albumImage={albumArt}
                        albumTitle={albumTitle}
                        artistThumbnail={artistThumbnail}
                        artistName={artistName}
                        artistID={artistID}
                        albumType={albumType}
                        numberOfSongs={numberOfSongs}
                        backgroundColor={albumColor}
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
                        albumData={albumTracks} 
                        addLikedSong={addLikedSong}
                        removeLikedSong={removeLikedSong}
                        previouslyLikedSongs={previouslyLikedSongs}
                        likedSongs={likedSongs}
                        loadingStreamingData={loadingStreamingData}
                        totalStreams={totalStreams}
                        lowestStreams={lowestStreams}
                        loadingSinglesData={loadingSinglesData}
                        totalStreamsWithoutSingles={totalStreamsWithoutSingles}
                        lowestStreamsWithoutSingles={lowestStreamsWithoutSingles}
                        albumHasSingles={albumHasSingles}
                        singlesByArtist={singlesByArtist}
                        displayInfoModal={displayInfoModal}
                        singlesDataCalculated={singlesDataCalculated}
                        streamingData={streamingData}
                    />
                    <div className="album-submit-button-container">
                        {/* <p className="album-release-date">{albumData.data.albumUnion.label}</p> */}
                        {/* <p className="record-label1">{albumData.data.albumUnion.copyright.items[0].text}</p> */}
                        
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
                {/* {!isLoadingSpotifyData && !loading && 
                <React.Fragment>
                    <AlbumDetailsHeader 
                        albumImage={albumArt}
                        albumTitle={albumTitle}
                        artistThumbnail={albumData.data.albumUnion.artists.items[0].visuals.avatarImage.sources[1].url}
                        artistName={artistName}
                        artistID={albumData.data.albumUnion.artists.items[0].id}
                        albumType={albumData.data.albumUnion.type}
                        numberOfSongs={albumData.data.albumUnion.tracks.totalCount}
                        backgroundColor={albumColor}
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
                        <p className="record-label1">{albumData.data.albumUnion.copyright.items[0].text}</p> */}
                        {/* <p className="record-label2">{albumData.data.albumUnion.copyright.items[1] ? albumData.data.albumUnion.copyright.items[1].text : albumData.data.albumUnion.copyright.items[0].text}</p> */}
                        {/* {!albumIsLiked && 
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
                </React.Fragment>} */}
        </React.Fragment>
    )
}

export default AlbumDetailsPage;