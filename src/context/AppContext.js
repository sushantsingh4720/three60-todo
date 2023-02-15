import { createContext, useState, useContext } from "react";
import axios from "../utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState({ error: false, message: "" });

  const storeData = async (token) => {
    try {
      await AsyncStorage.setItem("token", token)
        .then((res) => console.log("token is saved", res))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("user save error", err);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.clear()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("user remove error", err);
    }
  };

  const login = async ({ email, password }) => {
    try {
      await axios
        .post("/user/login", { email, password })
        .then((res) => {
          storeData(res.data.token);
          setToken(res.data.token);
        })
        .catch((err) => {
          setError({
            error: err.response.data.error,
            message: err.response.data.message,
          });
        });
    } catch (err) {
      console.log(err);
    }
    return;
  };

  const signUp = async (user) => {
    try {
      await axios
        .post("/user/signUp", user)
        .then((res) => {
          storeData(res.data.token);
          setToken(res.data.token);
        })
        .catch((err) =>
          setError({
            error: err.response.data.error,
            message: err.response.data.message,
          })
        );
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    removeData();
    setToken(null);
    console.log("hii  " + token);
  };

  return (
    <AppContext.Provider
      value={{ login, token, setToken, logout, signUp, error, setError }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
