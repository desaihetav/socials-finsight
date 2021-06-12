export const GET_ALL_USERS = `
query {
    users {
      id
      image_url
      name
      username
      bio
    }
  }
`;
