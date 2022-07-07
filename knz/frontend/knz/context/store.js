import { atom } from "jotai";

export const isLoggedIn = atom(false);

export const JWT = atom("");

export const JwtRefresh = atom("");

export const username = atom("");

export const categories = atom([]);

export const response = atom("");

export const error = atom("");

export const token = atom("");

export const store = atom([
  isLoggedIn,
  JWT,
  JwtRefresh,
  username,
  categories,
  response,
  error,
  token,
]);

export const getStore = (get) => {
  return {
    isLoggedIn: get(store, "isLoggedIn"),
    JWT: get(store, "JWT"),
    JwtRefresh: get(store, "JwtRefresh"),
    username: get(store, "username"),
    categories: get(store, "categories"),
    response: get(store, "response"),
    error: get(store, "error"),
    token: get(store, "token"),
  };
};

export const setStore = (set) => {
  return {
    isLoggedIn: set(store, "isLoggedIn"),
    JWT: set(store, "JWT"),
    JwtRefresh: set(store, "JwtRefresh"),
    username: set(store, "username"),
    categories: set(store, "categories"),
    response: set(store, "response"),
    error: set(store, "error"),
    token: set(store, "token"),
  };
};

// export const useStore = () => {
//     const [state, setState] = useState(getStore);
//     return [state, setState];
//     }
