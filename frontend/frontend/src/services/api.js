import axios from "axios";

// change baseURL if your backend port/host is different
export const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // if you use cookies/session
  headers: {
    "Content-Type": "application/json"
  }
});
