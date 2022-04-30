import axios from "axios";

const instance = axios.create({
  baseURL: "http://fundacioncrearte.online/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;