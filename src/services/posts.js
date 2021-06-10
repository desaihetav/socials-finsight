import { GET_ALL_POSTS, LIKE_POST, UNLIKE_POST } from "../graphql/posts";
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
  console.log(response);
  return response.data.data.delete_likes.returning[0];
};

// const extractRequiredFields = (user) => {
//   const finalUser = (({
//     name,
//     bio,
//     image_url,
//     header_image_url,
//     location,
//     website_url,
//     birth_date,
//   }) => ({
//     name,
//     bio,
//     image_url,
//     header_image_url,
//     location,
//     website_url,
//     birth_date,
//   }))(user);
//   return finalUser;
// };

// export const updateUser = async (updatedUser) => {
//   const finalUser = extractRequiredFields(updatedUser);
//   const variables = {
//     id: updatedUser.id,
//     changes: finalUser,
//   };
//   const response = await axios.post(GRAPHQL_ENDPOINT, {
//     query: UPDATE_USER_BY_ID,
//     variables,
//   });
//   return response.data.data.update_users.returning[0];
// };
