import axios from "axios";

export const getImages = ({ page, perPage }) => {
  const data = {
    method: "flickr.photos.getRecent",
    api_key: process.env.REACT_APP_FLICKR_API_KEY,
    format: "json",
    nojsoncallback: 1,
    page,
    per_page: perPage
  };
  return axios.get("https://www.flickr.com/services/rest/", {
    params: data
  });
};
