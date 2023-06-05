import React, { useEffect, useState } from "react";
import './AccountSetUpPage.css';
import { useHistory } from "react-router-dom";

const AccountSetUpPage = ({ oAuthCode, clientID, loginUser }) => {

    const history = useHistory();
    
    const [isLoading, setIsLoading] =useState(true);
    const [userData, setUserData] = useState({});
    const [isLoadingTrackData, setIsLoadingTrackData] = useState(true);
    const [userMusicData, setUserMusicData] = useState([]);
    const [numberOfLikedSongs, setNumberOfLikedSongs] = useState(0);
    const [numberOfSingles, setNumberOfSingles] = useState(0);
    const [numberOfAlbums, setNumberOfAlbums] = useState(0);
    const [username, setUsername] = useState('');
    const [accountCreated, setAccountCreated] = useState(false);
    
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

    const formatDataForDatabase = albumData => {
        const [albums, singles] = albumData;
        const albumIDs = Object.keys(albums);

        const formattedSingleData = singles.map(track => {
            const song = track.track.album;
            const likedSongs = JSON.stringify([{ 
                trackNumber: 1,
                trackName: song.name,
                trackID: track.track.id
            }]);
            return {
                link: `https://open.spotify.com/album/${song.id}`,
                albumID: song.id,
                albumArt: song.images[0].url,
                artistID: song.artists[0].id,
                albumTitle: song.name,
                artistName: song.artists[0].name,
                likedSongs: likedSongs,
                yearReleased: song.release_date.substring(0, 4),
                numberOfSongs: 1
            }
        });

        const formattedAlbumData = albumIDs.map(albumID => {
            const tracks = albums[albumID];
            const formattedTracks = tracks.map(track => {
                return {
                    trackNumber: track.track_number,
                    trackName: track.name,
                    trackID: track.id
                }
            });
            const stringifiedTracks = JSON.stringify(formattedTracks);
            const album = tracks[0].album;
            return {
                link: `https://open.spotify.com/album/${albumID}`,
                albumID: albumID,
                albumArt: album.images[0].url,
                albumTitle: album.name,
                artistName: album.artists[0].name,
                likedSongs: stringifiedTracks,
                yearReleased: album.release_date.substring(0, 4),
                artistID: album.artists[0].id,
                numberOfSongs: album.total_tracks
            }
        });
        return [formattedAlbumData, formattedSingleData];
    }

    const fetchUsersLikedSongs = async (accessToken, url, likedSongs) => {
        const trackData = await fetchUserData(accessToken, url);
        const newLikedSongs = [...likedSongs, trackData];
        const nextURL = trackData.next;

        if (nextURL !== null) {
            fetchUsersLikedSongs(accessToken, nextURL, newLikedSongs);
        } else {
            const formattedTrackData = formatTrackData(newLikedSongs);
            const formattedDatabaseData = formatDataForDatabase(formattedTrackData);
            setUserMusicData(formattedDatabaseData);
            setIsLoadingTrackData(false);
        }
    }

    const checkForUserInDatabase = async (spotifyID) => {
        try {
            const response = await fetch(`https://anthology-server.herokuapp.com/api/v1/user/${spotifyID}`);
            
            if (!response.ok) {
                throw new Error(response.status);
            }

            const data = await response.json();

            return data;
        } catch (err) {
            console.log(err);
        }
    }

    const login = async () => {
        try {

            const loginBody = { username, linkedToSpotify: true };

            const attempt = await fetch('https://anthology-server.herokuapp.com/api/v1/login', {
                method: 'POST',
                body: JSON.stringify(loginBody),
                headers: {
                    "Content-Type": "application/JSON"
                },
                credentials: 'include'
            });
    
            if (!attempt.ok) {
                throw new Error (attempt.status);
            }

            setIsLoadingTrackData(false);
            setIsLoading(false);

            const loginInfo = await attempt.json();

            loginUser();

            history.push('/');

        } catch (err) {
            console.log(err);
        }
    }

    const logInOrFetchData = async (spotifyID) => {
        const doesUserExist = await checkForUserInDatabase(spotifyID);

        if (doesUserExist.msg === 'account exists') {
            setUsername(spotifyID);
            setAccountCreated(true);
        } else if (doesUserExist.msg === 'account not created yet') {
            const accessToken = localStorage.getItem('access_token');
            fetchUsersLikedSongs(accessToken, 'https://api.spotify.com/v1/me/tracks?limit=50', []);
        }
    }

    const addMusicCollectionToDatabase = async (username) => {
        const body = {
            albums: userMusicData[0],
            singles: userMusicData[1],
            username: username
        }

        try {
            const response = await fetch('https://anthology-server.herokuapp.com/api/v1/addMusicCollectionFromSpotify', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/JSON"
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error (response.status);
            }

            const data = await response.json();

            return data;

        } catch (err) {
            console.log(err);
        }
    }

    const createNewUser = async () => {

        const name = userData.display_name.split(' ');

        const signupBody = {
            username: userData.id,
            password: userData.id,
            firstname: name[0],
            lastname: name[1],
            email: userData.email,
            linkedToSpotify: true,
            spotifyID: userData.id
        };

        try {
            const response = await fetch('https://anthology-server.herokuapp.com/api/v1/users', {
                method: 'POST',
                body: JSON.stringify(signupBody),
                headers: {
                    "Content-Type": "application/JSON"
                },
                credentials: 'include'
            });
    
            if (!response.ok) {
                throw new Error (response.status);
            }
    
            const data = await response.json();

            setUsername(data.username);

            const result = await addMusicCollectionToDatabase(data.username);

            console.log(result);

            setAccountCreated(true);

        } catch (err) {
            if (err.message === '401') {
                // If a user exists then log them in
                console.log('user already exists');
            }
        }
    }
    
    useEffect(() => {
        fetchSpotifyAccessToken();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            logInOrFetchData(userData.id);
        }
    }, [isLoading]);

    useEffect(() => {
        if (!isLoadingTrackData) {
            createNewUser();
        }
    }, [isLoadingTrackData]);

    useEffect(() => {
        if (accountCreated) {
            login();
        }
    }, [accountCreated]);

    return (
        <>
            {!isLoading && <h1 style={{ color: 'white' }}>Hello {userData.display_name.split(' ')[0]}</h1>}
            {!isLoading && isLoadingTrackData && <h1 style={{ color: 'white' }}>One moment while we get your tracks.</h1>}
            {!isLoading && !isLoadingTrackData && 
                <>
                    <h1 style={{ color: 'white' }}>{numberOfLikedSongs} songs found in {numberOfAlbums} albums and {numberOfSingles} singles.</h1>
                    <h1 style={{ color: 'white' }}>One moment while we create your account.</h1>
                </>
            }
        
        </>
    )
}

export default AccountSetUpPage;