import React, { useEffect, useState } from "react";
import './DiscographyPage.css';

import ArtistCard from "../ArtistCard/ArtistCard";
import AlbumContainer from "../AlbumContainer/AlbumContainer";
import { useHistory } from "react-router-dom";

const DiscographyPage = ({ type, artistID, saveAlbum, removeAlbum, artistName }) => {
    
    const [discographyData, setDiscographyData] = useState({});
    const [loading, setLoading] = useState(true);
    
    const history = useHistory()
    
    const fetchDiscographyData = async () => {
        let fetchUrl;

        if (type === 'singles') { fetchUrl = `http://localhost:8000/api/v1/artistSingleAndEpData/${artistID}` }
        if (type === 'albums') { fetchUrl = `http://localhost:8000/api/v1/artistAlbumData/${artistID}` }

        try {
            const response = await fetch(fetchUrl);

            if (!response.ok) {
                throw new Error(response.status)
            }

            const data = await response.json();

            setDiscographyData(data);
            setLoading(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchDiscographyData();
    }, [])

    return (
        <React.Fragment>
            {loading && <h1 style={{ color: 'white' }}>-- LOADING --</h1>}
            {!loading && 
                <React.Fragment>
                    <div className="discography-header">
                        <p 
                            className="artist-name-heading"
                            onClick={() => history.push(`/artist/${artistID}`)}
                        >{artistName}</p>
                    </div>
                    <AlbumContainer 
                        heading={type[0].toUpperCase() + type.substring(1)}
                        albumData={discographyData.data.artistUnion.discography[type]}
                        artistID={artistID}
                        saveAlbum={saveAlbum}
                        removeAlbum={removeAlbum}
                        likedAlbums={[]}
                        discography={true}
                    />
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default DiscographyPage;