import React, { useEffect, useState } from "react";
import './AccountSetUpPage.css';

const AccountSetUpPage = ({ oAuthCode, clientID }) => {
    
    const [isLoading, setIsLoading] =useState(true);
    const [userData, setUserData] = useState({});
    const [isLoadingTrackData, setIsLoadingTrackData] = useState(true);
    const [usersLikedSongs, setUsersLikedSongs] = useState([]);
    
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

            console.log(accessToken)

            localStorage.setItem('access_token', data.access_token);

            const userData = await fetchUserData(accessToken, 'https://api.spotify.com/v1/me');

            if (typeof userData === 'string') {
                throw new Error(userData);
            }

            const usersLikedTracks = await fetchUserData(accessToken, 'https://api.spotify.com/v1/me/tracks?offset=50&limit=50');
            console.log(usersLikedTracks);

            setUserData(userData);
            setIsLoading(false);

        } catch(err) {
            console.log(err);
        }
    }

    const fetchUsersLikedSongs = async (accessToken, url, likedSongs) => {
        const trackData = await fetchUserData(accessToken, url);
        const newLikedSongs = [...likedSongs, trackData];
        console.log(newLikedSongs);
        const nextURL = trackData.next;

        if (nextURL !== null) {
            fetchUsersLikedSongs(accessToken, nextURL, newLikedSongs);
        } else {
            setUsersLikedSongs(newLikedSongs);
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
    }, [isLoading])


    return (
        <>
            {isLoading && <h1 style={{ color: 'white' }}>-- LOADING --</h1>}
            {!isLoading && <h1 style={{ color: 'white' }}>Hello {userData.display_name.split(' ')[0]}</h1>}
            {!isLoading && isLoadingTrackData && <h1 style={{ color: 'white' }}>One moment while we get your tracks.</h1>}
            {!isLoading && !isLoadingTrackData && <h1 style={{ color: 'white' }}>Track data here.</h1>}
        
        </>
    )
}

export default AccountSetUpPage;