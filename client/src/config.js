import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://myadvice-app.herokuapp.com/api/",
});
