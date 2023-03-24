import React, { useEffect, useState } from "react";
import './SearchLoadingPage.css';
import LoadingArtistCard from "../LoadingArtistCard/LoadingArtistCard";

const SearchLoadingPage = () => {

    // const [numberOfFakeResults, setNumberOfFakeResults] = useState(0);

    // useEffect(() => {
    //     const windowWidth = window.innerWidth;
    //     if (windowWidth > 1600) {
    //         setNumberOfFakeResults(21);
    //     } else if (windowWidth > 1200) {
    //         setNumberOfFakeResults(15);
    //     } else if (windowWidth > 700) {
    //         setNumberOfFakeResults(9);
    //     } else {
    //         setNumberOfFakeResults(4);
    //     }
    // }, [])

    const fakeArtistCards = []

    for (let i = 0; i < 21; i++) {
        fakeArtistCards.push(<LoadingArtistCard key={i} />);
    }


    return (
        <div className="artist-container">
            {fakeArtistCards}
        </div>
    )
}

export default SearchLoadingPage;