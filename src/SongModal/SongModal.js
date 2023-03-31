import React from "react";
import './SongModal.css';



import SongModalSongCard from "../SongModalSongCard/SongModalSongCard";

const SongModal = ({ trackData, submitAlbum, addLikedSong, removeLikedSong, previouslyLikedSongs }) => {

    const songCards = trackData.data.albumUnion.tracks.items.map((song, index) => {

        let isLiked;

        if (previouslyLikedSongs) {
            isLiked = previouslyLikedSongs.find(likedSong => likedSong.trackName === song.track.name && likedSong.trackNumber === song.track.trackNumber);
        }


        return (
            <SongModalSongCard 
                key={index}
                trackID={song.uid}
                trackNumber={song.track.trackNumber}
                trackName={song.track.name}
                addLikedSong={addLikedSong}
                removeLikedSong={removeLikedSong}
                songIsLiked={isLiked ? true : false}
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