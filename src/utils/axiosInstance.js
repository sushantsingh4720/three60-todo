import axios from "axios";
const instance = axios.create({
  baseURL: "https://reactnative-user-backend.onrender.com/api",
});

export default instance;
