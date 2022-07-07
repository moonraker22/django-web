// import { newApolloClient } from "../../../lib/MyApolloClient";
import { useQuery, useMutation } from "@apollo/client";
import { USER_FRONTEND } from "../../../lib/ApolloMutations";

export default function handler(req, res) {
  const email = req?.body?.email;
  const { data, err } = useQuery(USER_FRONTEND, {
    variables: {
      email,
    },
  });
  console.log(data, err);
  if (data?.userFrontend?.email === email) {
    res.status(200).json({ message: data });
  } else {
    res.status(500).json({ message: data, err });
  }
}
