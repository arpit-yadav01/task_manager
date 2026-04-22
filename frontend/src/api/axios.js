import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-n38k.onrender.com/api",
  withCredentials: true, 
});

export default API;