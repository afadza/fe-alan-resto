import axios from "axios";

export const API = axios.create({
  baseURL: "https://api-alan-resto.onrender.com/api",
});
