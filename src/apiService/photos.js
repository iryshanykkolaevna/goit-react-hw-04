import axios from 'axios';

const ACCESS_KEY = 'Sfo5V3dajoHkdriH2hBeo8gbSA4Sc1xfoJAvL8u0M_E';

axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(
    `search/photos/?client_id=${ACCESS_KEY}&query=${query}&page=${page}`
  );

  return data;
};