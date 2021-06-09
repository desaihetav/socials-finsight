import { GET_USER_BY_ID, UPDATE_USER_BY_ID } from "../graphql/user";
import axios from "axios";
import { GRAPHQL_ENDPOINT } from "../lib/constants";

export const getUser = async (userId) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: GET_USER_BY_ID,
    variables: {
      id: userId,
    },
  });
  console.log(response);
  return response.data.data.users[0];
};

const extractRequiredFields = (user) => {
  const finalUser = (({
    name,
    bio,
    image_url,
    header_image_url,
    location,
    website_url,
    birth_date,
  }) => ({
    name,
    bio,
    image_url,
    header_image_url,
    location,
    website_url,
    birth_date,
  }))(user);
  return finalUser;
};

export const updateUser = async (updatedUser) => {
  const finalUser = extractRequiredFields(updatedUser);
  const variables = {
    id: updatedUser.id,
    changes: finalUser,
  };
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: UPDATE_USER_BY_ID,
    variables,
  });
  return response.data.data.update_users.returning[0];
};
