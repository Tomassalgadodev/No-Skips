const getArtistsReleases = async (artistID, token) => {
    
}

const getArtistData = async (artistID, token) => {

    const artistParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistID}`, artistParameters);
        const response2 = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums`, artistParameters);
  
        if (!response.ok) {
          throw new Error(response.status);
        } else if (!response2.ok) {
            throw new Error(response2.status)
        }
  
        const data = await response.json();
        const data2 = await response2.json();
  
        return [data, data2];
  
      } catch (err) {
        return err.message;
      }
}

export default getArtistData;