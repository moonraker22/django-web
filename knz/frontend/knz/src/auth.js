// import newApolloClient from "../lib/MyApolloClient";
import {
  REFRESH_TOKEN,
  VERIFY_TOKEN,
  REFRESH_COOKIE_TOKEN,
} from "./ApolloMutations";
import ALL_CATEGORIES from "./ApolloQueries";
import { useAppContext } from "../context/context";
import Cookies from "js-cookie";
import { useQuery, useMutation } from "@apollo/client";

//   const client = newApolloClient();

// export function tokenRefresh(client) {
//   client
//     .mutate({
//       mutation: REFRESH_TOKEN,
//       credentials: "include",
//       // context: {
//       //   headers: {
//       //     Authorization: `JWT ${JWTRefreshToken}`,
//       //   },
//       // },
//       variables: {
//         refreshToken: `${localStorage.getItem("JWTRefreshToken")}`,
//       },
//     })
//     .then((res) => {
//       console.log(res);
//       setJWTAccessToken(res.data.refreshToken.token);
//       setJWTRefreshToken(res.data.refreshToken.refreshToken);
//       console.log(res.data.refreshToken.token);
//       console.log(res.data.refreshToken);
//       console.log(res.data.refreshToken.refreshToken);
//       setJWTTokenExpiry(false);
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }

export const tokenRefresh = (client) => {
  client
    .mutate({
      mutation: REFRESH_COOKIE_TOKEN,
      credentials: "include",
      fetchPolicy: "no-cache",
    })
    .then((res) => {
      // console.log(res.data.refreshToken.token);
      setJwtToken(res.data.refreshToken.token);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const verifyToken = (client) => {
  const { res, err } = client
    .mutate({
      mutation: VERIFY_TOKEN,
      credentials: "include",
      fetchPolicy: "no-cache",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
  if (res) {
    return true;
  } else {
    return false;
  }
};

export const useAuth = () => {
  // const { state, dispatch } = useAppContext();
  const { token, refreshToken, errorMessage } = state;
  const client = newApolloClient();

  const refresh = () => {
    tokenRefresh(client, {
      token,
      refreshToken,
      errorMessage,
    });
  };

  const verify = () => {
    verifyToken(token);
  };

  return {
    token,
    refreshToken,
    errorMessage,
    refresh,
    verify,
  };
};

export const fetchProtectedData = async (client, query, variables) => {
  const verify = await verifyToken(client);
  if (!verify) {
    tokenRefresh(client);
  }
  const { res, err } = client
    .query({
      query: query,
      // fetchPolicy: "no-cache",
      credentials: "include",
      context: {
        headers: {
          Authorization: `JWT ${getJwtToken()}`,
        },
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err.message);
      return err;
    });
  if (res) {
    return res;
  }
  if (err) {
    return err;
  }
};

export const useProtectedData = async (client, query) => {
  //   const { response, setResponse, error, setError } = useAppContext();
  const verify = await verifyToken(client);
  if (!verify) {
    tokenRefresh(client);
  }
  const { res, err } = client
    .query({
      query: query,
      // fetchPolicy: "no-cache",
      credentials: "include",
      context: {
        headers: {
          Authorization: `JWT ${getJwtToken()}`,
        },
      },
    })
    .then((res) => {
      console.log(res);
      return res;
      // setResponse(res);
    })
    .catch((err) => {
      console.log(err.message);
      return err;
      // setError(err);
    });
  if (res) {
    console.log(res);
    return res;
  }
  if (err) {
    console.log(err);
    return err;
  }
};

export const mutateProtectedData = async (client, mutation, variables) => {
  const verify = await verifyToken(client);
  if (verify) {
    const { res, err } = client.mutate({
      mutation,
      variables: {
        variables,
      },
    });
    return { res, err };
  } else {
    tokenRefresh(client);
    const { res, err } = client.mutate({
      mutation,
      variables: {
        variables,
      },
    });
    return { res, err };
  }
};

export const preFetch = async (client) => {
  const verify = await verifyToken(client);
  if (!verify) {
    tokenRefresh(client);
  }
};

export function getJwtToken() {
  return sessionStorage.getItem("JWT");
}

export function setJwtToken(token) {
  sessionStorage.setItem("JWT", token);
}

export function getRefreshToken() {
  return sessionStorage.getItem("refreshToken");
}

export function setRefreshToken(token) {
  sessionStorage.setItem("refreshToken", token);
}
