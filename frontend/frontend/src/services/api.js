import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // change to your backend port (your index.js uses PORT default 5000 or env PORT). Use 5000 if you used that.
  withCredentials: false, // cookies not used in this simple example
  headers: { "Content-Type": "application/json" }
});
