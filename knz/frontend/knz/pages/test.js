import newApolloClient from "../lib/MyApolloClient";
import { useQuery, useMutation } from "@apollo/client";
import {
  tokenRefresh,
  fetchProtectedData,
  mutateProtectedData,
  getJwtToken,
  getRefreshToken,
  verifyToken,
  useProtectedData,
} from "../lib/auth";
import ClientOnly from "../components/ClientOnly";
import { ALL_CATEGORIES, USER_FRONTEND } from "../lib/ApolloQueries";
import {
  VERIFY_TOKEN,
  REFRESH_COOKIE_TOKEN,
  NEW_USER,
} from "../lib/ApolloMutations";
import { useAppContext } from "../context/context";
import * as React from "react";
import Cookies from "js-cookie";
// import BasicMenu from "../components/Dropdown";
import CategoryDrop from "../components/CategoryDrop";
import FloatingActionButtonZoom from "../components/FAB";
import { atom, useAtom, useAtomValue } from "jotai";
// import { token, store, getStore, setStore } from "../context/store";
import { Button } from "@mui/material";

export default function Test() {
  // const myContext = useAppContext();
  const client = newApolloClient();
  const myContext = useAppContext();

  function handleClick(e) {
    myContext.setToken("test");
    console.log(myContext);
  }

  if (typeof window !== "undefined") {
  }
  const { data, loading, error } = useQuery(USER_FRONTEND, {
    variables: {
      email: "admin@admin.com",
    },
  });

  console.log(data, loading, error);

  return (
    <div>
      <h1>Test</h1>
      {/* <BasicMenu /> */}
      <CategoryDrop />
      {/* <FloatingActionButtonZoom /> */}
      {/* <Input /> */}
      <Button onClick={handleClick}>Click</Button>
      <ClientOnly>
        {/* {state} */}
        <div>
          <h2>Client Only</h2>
          <p>This is only rendered on the client</p>
        </div>
      </ClientOnly>

      {/* <p>{useAtomValue(textAtom)}</p>
      <p>{useAtomValue(uppercaseAtom)}</p> */}
    </div>
  );
}
