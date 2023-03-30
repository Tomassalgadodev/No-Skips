import React from "react";
import './SongModal.css';



import SongModalSongCard from "../SongModalSongCard/SongModalSongCard";

const SongModal = ({ trackData, submitAlbum, addLikedSong, removeLikedSong }) => {

    const songCards = trackData.data.albumUnion.tracks.items.map((song, index) => {
        return (
            <SongModalSongCard 
                key={index}
                trackNumber={song.track.trackNumber}
                trackName={song.track.name}
                addLikedSong={addLikedSong}
                removeLikedSong={removeLikedSong}
            />
        )
    })

    return (
        <React.Fragment>
            <div className="mini-song-container-heading">
                <p className="hash">#</p>
                <p className="title">Title</p>
            </div>
            {songCards}
            <div className="mini-submit-button-container">
                <button onClick={submitAlbum} className="mini-submit-album-button">Submit album</button>
            </div>
        </React.Fragment>
    )
}

export default SongModal;