import React from "react";
import './SongModal.css';



import SongModalSongCard from "../SongModalSongCard/SongModalSongCard";

const SongModal = ({ albumData, submitAlbum, addLikedSong, removeLikedSong, likedSongs, albumIsLiked, replaceAlbum }) => {

    let songCards

    if (albumData) {
        songCards = albumData.tracks.items.map((song, index) => {
    
            let isLiked;
    
            if (likedSongs.length > 0) {
                isLiked = likedSongs.find(likedSong => likedSong.trackID === song.id);
            }
    
    
            return (
                <SongModalSongCard 
                    key={index}
                    trackID={song.id}
                    trackNumber={song.track_number}
                    trackName={song.name}
                    addLikedSong={addLikedSong}
                    removeLikedSong={removeLikedSong}
                    songIsLiked={isLiked ? true : false}
                    likedSongs={likedSongs}
                />
            )
        });
    } else {
        console.log('Error');
    }


    return (
        <React.Fragment>
            <div className="mini-song-container-heading">
                <p className="hash">#</p>
                <p className="title">Title</p>
            </div>
            {songCards}
            {!albumIsLiked && albumData &&
                <div className="mini-submit-button-container">
                    <button onClick={submitAlbum} className="mini-submit-album-button">Submit album</button>
                </div>        
            }
            {albumIsLiked && albumData &&
                <div className="mini-submit-button-container">
                    <button onClick={replaceAlbum} className="mini-submit-album-button">Edit album</button>
                </div>   
            }
            {!albumData &&
                <h1>-- Something went wrong --</h1>
            }
        </React.Fragment>
    )
}

export default SongModal;