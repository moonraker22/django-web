import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import newApolloClient from "./MyApolloClient";

const useApollo = async (type, document, variables = {}, options = {}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const client = newApolloClient();

  useEffect(() => {
    const func = async () => {
      const res = await client.query({
        query: document,
        variables,
        options,
      });
      // console.log(res);
      return res;
    };
    func();
  }, [document]);
  return { data, isLoading, error };
};

export default useApollo;
