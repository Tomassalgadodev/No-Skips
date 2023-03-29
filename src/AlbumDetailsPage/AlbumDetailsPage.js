import React, { useEffect, useState } from "react";
import './AlbumDetailsPage.css';

import AlbumDetailsHeader from "../AlbumDetailsHeader/AlbumDetailsHeader";
import SongContainer from "../SongContainer/SongContainer";

const AlbumDetailsPage = ({ albumID, likedAlbums, saveAlbum, removeAlbum }) => {

    const [albumData, setAlbumData] = useState({});
    const [trackData, setTrackData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchAlbumData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/album/${albumID}`);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const [albumData, trackData] = await response.json();

            setAlbumData(albumData);
            setTrackData(trackData);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {   
        fetchAlbumData();
    }, [])


    return (
        <React.Fragment>
            {loading && <h1>-- Loading --</h1>}
            {!loading && 
                <React.Fragment>
                    <AlbumDetailsHeader 
                        albumImage={albumData.data.albumUnion.coverArt.sources[0].url}
                        albumTitle={albumData.data.albumUnion.name}
                        artistThumbnail={albumData.data.albumUnion.artists.items[0].visuals.avatarImage.sources[1].url}
                        artistName={albumData.data.albumUnion.artists.items[0].profile.name}
                        artistID={albumData.data.albumUnion.artists.items[0].id}
                        albumType={albumData.data.albumUnion.type}
                        numberOfSongs={albumData.data.albumUnion.tracks.totalCount}
                        albumLength={''}
                    />
                    <SongContainer />
                </React.Fragment>}
        </React.Fragment>
    )
}

export default AlbumDetailsPage;