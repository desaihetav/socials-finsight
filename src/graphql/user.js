export const GET_USER_BY_ID = `
  query ($id: uuid!) {
    users(where: { id: { _eq: $id } }) {
      id
      name
      email
      username
      bio
      image_url
      header_image_url
      location
      website_url
      birth_date
      created_at
      followers
      following
    }
  }
`;

export const UPDATE_USER_BY_ID = `
  mutation ($id: uuid!, $changes: users_set_input!) {
    update_users(where: { id: { _eq: $id } }, _set: $changes) {
      returning {
        id
        name
        email
        username
        bio
        image_url
        header_image_url
        location
        website_url
        birth_date
        created_at
        followers
        following
      }
    }
  }
`;
