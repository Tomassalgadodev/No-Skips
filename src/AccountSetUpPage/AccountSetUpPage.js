import React, { useEffect, useState } from "react";
import './AccountSetUpPage.css';

const AccountSetUpPage = ({ oAuthCode, clientID }) => {
    
    const [isLoading, setIsLoading] =useState(true);
    const [userData, setUserData] = useState({});
    const [isLoadingTrackData, setIsLoadingTrackData] = useState(true);
    const [rawTrackData, setRawTrackData] = useState([]);
    const [usersSingles, setUsersSingles] = useState([]);
    const [usersAlbums, setUsersAlbums] = useState({});
    const [numberOfLikedSongs, setNumberOfLikedSongs] = useState(0);
    const [numberOfSingles, setNumberOfSingles] = useState(0);
    const [numberOfAlbums, setNumberOfAlbums] = useState(0);
    
    const fetchUserData = async (accessToken, endPoint) => {
        
        try {
            const response = await fetch(endPoint, {
                headers: {
                  Authorization: 'Bearer ' + accessToken
                }
            });

            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }
            
            const data = await response.json();

            return data;

        } catch (err) {
            return err;
        }
    }

    const fetchSpotifyAccessToken = async () => {
        const redirectUri = 'http://localhost:3000';
        let codeVerifier = localStorage.getItem('code_verifier');

        let body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: oAuthCode,
            redirect_uri: redirectUri,
            client_id: clientID,
            code_verifier: codeVerifier
        });

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body
            });

            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }

            const data = await response.json();

            const accessToken = data.access_token;

            localStorage.setItem('access_token', data.access_token);

            const userData = await fetchUserData(accessToken, 'https://api.spotify.com/v1/me');

            if (typeof userData === 'string') {
                throw new Error(userData);
            }

            setUserData(userData);
            setIsLoading(false);

        } catch(err) {
            console.log(err);
        }
    }

    const formatTrackData = trackData => {
        const individualTracks = trackData.reduce((formattedArray, dataPoint) => {
            return formattedArray.concat(dataPoint.items);
        }, []);
        
        setNumberOfLikedSongs(individualTracks.length);

        const [albums, singles] = individualTracks.reduce((albumsAndSingles, track) => {
            if (track.track.album.total_tracks > 1) {
                albumsAndSingles[0].push(track);
            } else {
                albumsAndSingles[1].push(track);
            }
            return albumsAndSingles;
        }, [[], []]);

        setNumberOfSingles(singles.length);

        const formattedAlbumData = albums.reduce((albums, track) => {
            const albumID = track.track.album.id;
            albums[albumID] ? albums[albumID].push(track.track) : albums[albumID] = [track.track];
            return albums;
        }, {});

        setNumberOfAlbums(Object.keys(formattedAlbumData).length);

        return [formattedAlbumData, singles];
    }

    const fetchUsersLikedSongs = async (accessToken, url, likedSongs) => {
        const trackData = await fetchUserData(accessToken, url);
        const newLikedSongs = [...likedSongs, trackData];
        const nextURL = trackData.next;

        if (nextURL !== null) {
            fetchUsersLikedSongs(accessToken, nextURL, newLikedSongs);
        } else {
            const formattedTrackData = formatTrackData(newLikedSongs);
            console.log(formattedTrackData);
            setRawTrackData(newLikedSongs);
            setUsersAlbums(formattedTrackData[0]);
            setUsersSingles(formattedTrackData[1]);
            setIsLoadingTrackData(false);
        }
    }
    
    useEffect(() => {
        fetchSpotifyAccessToken();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const accessToken = localStorage.getItem('access_token');
            fetchUsersLikedSongs(accessToken, 'https://api.spotify.com/v1/me/tracks?limit=50', []);
        }
    }, [isLoading]);

    // useEffect(() => {
    //     if (!isLoadingTrackData) {
    //         const likedSongs = formatTrackData(rawTrackData);
    //         setUsersLikedSongs(likedSongs);
    //     }
    // }, [isLoadingTrackData])


    return (
        <>
            {isLoading && <h1 style={{ color: 'white' }}>-- LOADING --</h1>}
            {!isLoading && <h1 style={{ color: 'white' }}>Hello {userData.display_name.split(' ')[0]}</h1>}
            {!isLoading && isLoadingTrackData && <h1 style={{ color: 'white' }}>One moment while we get your tracks.</h1>}
            {!isLoading && !isLoadingTrackData && <h1 style={{ color: 'white' }}>{numberOfLikedSongs} songs found in {numberOfAlbums} albums and {numberOfSingles} singles.</h1>}
        
        </>
    )
}

export default AccountSetUpPage;