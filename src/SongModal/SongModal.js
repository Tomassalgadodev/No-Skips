import React from "react";
import './SongModal.css';



import SongModalSongCard from "../SongModalSongCard/SongModalSongCard";

const SongModal = ({ trackData, submitAlbum, addLikedSong, removeLikedSong, likedSongs }) => {

    const songCards = trackData.data.albumUnion.tracks.items.map((song, index) => {

        console.log(song);

        let isLiked;

        if (likedSongs.length > 0) {
            isLiked = likedSongs.find(likedSong => likedSong.trackName === song.track.name && likedSong.trackNumber === song.track.trackNumber);
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
                likedSongs={likedSongs}
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