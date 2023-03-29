import React from "react";
import './SongContainer.css';

import SongCard from "../SongCard/SongCard";

const SongContainer = () => {
    return (
        <div>
            <div>
                <p>#</p>
                <p>Title</p>
                <p>Clock Icon</p>
            </div>
            <SongCard />
        </div>
    )
}

export default SongContainer;