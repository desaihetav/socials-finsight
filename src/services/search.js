import axios from "axios";
import { GRAPHQL_ENDPOINT } from "../lib/constants";
import { FOLLOW_USER, GET_ALL_USERS } from "../graphql/search";

export const getUsers = async (userId) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: GET_ALL_USERS,
  });
  console.log(response);
  return response.data.data.users;
};
