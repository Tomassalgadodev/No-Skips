import React, { useEffect, useState } from "react";
import './AlbumDetailsPage.css';

const AlbumDetailsPage = ({ albumID, likedAlbums, saveAlbum, removeAlbum }) => {

    const [albumData, setAlbumData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchAlbumData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/album/${albumID}`);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const data = await response.json();

            console.log(data)

            setAlbumData(data);
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
            {!loading && <h1>Album Details Page</h1>}
        </React.Fragment>
    )
}

export default AlbumDetailsPage;