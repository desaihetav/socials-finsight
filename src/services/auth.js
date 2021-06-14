import axios from "axios";
import { LOGIN_USER, SIGNUP_USER } from "../graphql/auth";
import { FOLLOW_USER, UNFOLLOW_USER } from "../graphql/user";
import { GRAPHQL_ENDPOINT } from "../lib/constants";

export const loginUser = async (variables) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: LOGIN_USER,
    variables,
  });
  return response;
};

export const signupUser = async (variables) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: SIGNUP_USER,
    variables,
  });
  console.log(response);
  return response;
};

export const followUserById = async (variables) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: FOLLOW_USER,
    variables,
  });
  console.log(response);
  return response.data.data.insert_follows_one;
};

export const unfollowUserById = async (variables) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: UNFOLLOW_USER,
    variables,
  });
  console.log(response);
  return response.data.data.delete_follows.returning[0];
};
