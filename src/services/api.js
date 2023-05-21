import axios from 'axios';
const BASEURL = 'https://pixabay.com/api/';
const KEY = '34896176-7425f1cf8cd409f756c485d74';

export const fetchImages = async (name, page = 1) => {
  try {
    const { data } = await axios({
      url: BASEURL,
      method: 'get',
      params: {
        key: KEY,
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        page,
        per_page: 12,
        safesearch: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });
    const { totalHits, hits } = data;
    const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));

    return { totalHits, images };
  } catch (error) {
    console.log(error.message);
  }
};
