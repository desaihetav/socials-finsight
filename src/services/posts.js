import {
  CREATE_NEW_POST,
  GET_ALL_POSTS,
  LIKE_POST,
  REPOST_POST,
  SAVE_POST,
  UNLIKE_POST,
  UNREPOST_POST,
  UNSAVE_POST,
} from "../graphql/posts";
import axios from "axios";
import { GRAPHQL_ENDPOINT } from "../lib/constants";

export const getPosts = async (user_id) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: GET_ALL_POSTS,
    variables: {
      user_id,
    },
  });
  console.log(response);
  return response.data.data;
};

export const likePost = async (variables) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: LIKE_POST,
    variables,
  });
  return response.data.data.insert_likes_one;
};

export const unlikePost = async (variables) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: UNLIKE_POST,
    variables,
  });
  return response.data.data.delete_likes.returning[0];
};

export const savePost = async (variables) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: SAVE_POST,
    variables,
  });
  return response.data.data.insert_saves_one;
};

export const unsavePost = async (variables) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: UNSAVE_POST,
    variables,
  });
  console.log(response);
  return response.data.data.delete_saves.returning[0];
};

export const repostPost = async (variables) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: REPOST_POST,
    variables,
  });
  return response.data.data.insert_reposts_one;
};

export const unrepostPost = async (variables) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: UNREPOST_POST,
    variables,
  });
  return response.data.data.delete_reposts.returning[0];
};

export const createNewPost = async (variables) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: CREATE_NEW_POST,
    variables,
  });
  return response.data.data.insert_posts_one;
};
