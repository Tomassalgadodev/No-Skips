import React, { useEffect, useState } from "react";
import './DiscographyPage.css';

import ArtistCard from "../ArtistCard/ArtistCard";
import AlbumContainer from "../AlbumContainer/AlbumContainer";
import { useHistory } from "react-router-dom";

import { getArtistData } from "../fetchRequests";

const DiscographyPage = ({ type, artistID, saveAlbum, removeAlbum, artistName, spotifyAccessToken, likedAlbums }) => {
    
    const [loading, setLoading] = useState(true);
    const [singles, setSingles] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [compilations, setCompilations] = useState([]);
    const [usersLikedAlbumsFromArtist, setUsersLikedAlbumsFromArtist] = useState([]);
    
    const history = useHistory()

    const getDiscographyData = async () => {        
        try {
            const data = await getArtistData(artistID, spotifyAccessToken);

            if (typeof data === 'string') {
                throw new Error(data)
            }

            const singles = data[1].items.filter(release => release.album_group === 'single' && release.album_type === 'single');
            const albums = data[1].items.filter(release => release.album_group === 'album' && release.album_type === 'album');
            const compilations = data[1].items.filter(release => release.album_group === 'appears_on');

            setSingles(singles);
            setAlbums(albums);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDiscographyData();
    }, [])

    useEffect(() => {
        if (likedAlbums.length > 0) {
            const albums = likedAlbums.filter(album => album.artistID === artistID);
            console.log(albums)

            setUsersLikedAlbumsFromArtist(albums);
        } else {
            setUsersLikedAlbumsFromArtist([]);
        }
    }, [likedAlbums]);

    return (
        <React.Fragment>
                <React.Fragment>
                    <div className="discography-header">
                        <p 
                            className="artist-name-heading"
                            onClick={() => history.push(`/artist/${artistID}`)}
                        >{artistName}</p>
                    </div>
                </React.Fragment>
            {loading && <h1>-- LOADING --</h1>}
            {!loading && 
                    <AlbumContainer 
                        heading={type[0].toUpperCase() + type.substring(1)}
                        albumData={type === 'singles' ? singles : type === 'albums' ? albums : compilations}
                        artistID={artistID}
                        saveAlbum={saveAlbum}
                        removeAlbum={removeAlbum}
                        likedAlbums={usersLikedAlbumsFromArtist}
                        discography={true}
                        showAll={true}
                        spotifyAccessToken={spotifyAccessToken}
                        artistName={artistName}
                    />
            }
        </React.Fragment>
    )
}

export default DiscographyPage;