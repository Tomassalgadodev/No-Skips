import React from "react";
import LoadingAlbumCard from "../LoadingAlbumCard/LoadingAlbumCard";
import './ArtistLoadingPage.css';

const ArtistLoadingPage = () => {

    const fakeAlbumCards = [];

    for (let i = 0; i < 10; i++) {
        fakeAlbumCards.push(<LoadingAlbumCard key={i} />)
    }



    return (
        <div>
            <div className="fake-artist-heading"></div>
            <div className="dashboard-container">
                <div className="fake-album-tag"></div>
                <div className="saved-album-container">
                    {fakeAlbumCards}
                </div>
            </div>
        </div>
    )
}

export default ArtistLoadingPage;


// CREATE FAKE ALBUM CARDS AND STYLE THEM WITH PROPER ANIMATION