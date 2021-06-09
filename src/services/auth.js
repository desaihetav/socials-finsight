import axios from "axios";
import { LOGIN_USER } from "../graphql/auth";
import { GRAPHQL_ENDPOINT } from "../lib/constants";

export const loginUser = async (variables) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: LOGIN_USER,
    variables,
  });
  return response.data.data.login;
};
