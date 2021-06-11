import axios from "axios";
import { GET_NOTIFICATIONS } from "../graphql/notifications";
import { GRAPHQL_ENDPOINT } from "../lib/constants";

export const getNotificationsForUserId = async (user_id) => {
  const response = await axios.post(GRAPHQL_ENDPOINT, {
    query: GET_NOTIFICATIONS,
    variables: {
      receiver_id: user_id,
    },
  });
  return response.data.data;
};
