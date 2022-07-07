// import { useStat } from "react";
import { newApolloClient } from "../../../lib/MyApolloClient";
import { useQuery, useMutation } from "@apollo/client";
import { NEW_USER } from "../../../lib/ApolloMutations";

export default function handler(req, res) {
  const email = req?.body?.email;
  const password = req?.body?.password;
  const name = req?.body?.name;

  const { data, err } = useQuery(USER_FRONTEND, {
    variables: {
      email,
    },
  });
  console.log(data, err);
  if (data?.userFrontend?.email === email) {
    res.status(200).json({ message: res });
  } else {
    const { data, err } = useMutation(NEW_USER, {
      variables: {
        email,
        password,
        name,
      },
    });
    console.log(data, err);
    if (data?.newUserMutation?.__typename === "UserCreateMutation") {
      res.status(200).json({ message: res });
    } else {
      res.status(500).json({ message: res, err });
    }
  }
}
