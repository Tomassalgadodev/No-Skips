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
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistID}`, artistParameters)
  
        if (!response.ok) {
          throw new Error(response.status);
        }
  
        const data = await response.json();
  
        return data;
  
      } catch (err) {
        return err.message;
      }
}

export default getArtistData;