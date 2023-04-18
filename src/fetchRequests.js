const getArtistsReleases = async (artistID, token) => {
    
}

export const getArtistData = async (artistID, token) => {

    const fetchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistID}`, fetchParameters);
        const response2 = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums`, fetchParameters);
  
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

export const getSingleAlbumData = async (albumID, token) => {

    const fetchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      try {

        const response = await fetch(`https://api.spotify.com/v1/albums/${albumID}`, fetchParameters);

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        console.log(data);
        return data;
      } catch (err) {
        return err.message;
      }
}