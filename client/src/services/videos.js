import axios from 'axios';
const baseUrl = 'http://localhost:4001/videos';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllVideos = ({ token }) => {
  const req = axios.get(baseUrl);
  return req.then(response => response.data);
};

const subirVideo = (newVideo) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, newVideo, config)
  return request.then(response => response.data);
}

export default { getAllVideos, subirVideo, setToken }