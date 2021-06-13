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
      followers {
        follower_id
        followers {
          id
          image_url
          name
          username
          bio
        }
      }
      following {
        following_id
        following {
          id
          image_url
          name
          username
          bio
        }
      }
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
      }
    }
  }
`;

export const FOLLOW_USER = `
mutation ($follower_id: uuid!, $following_id: uuid) {
  insert_follows_one(object: {follower_id: $follower_id, following_id: $following_id}) {
    follower_id
    following_id
  }
}
`;

export const UNFOLLOW_USER = `
mutation ($follower_id: uuid!, $following_id: uuid) {
  delete_follows(where: {follower_id: {_eq: $follower_id}, following_id: {_eq: $following_id}}) {
    affected_rows
    returning {
      follower_id
      following_id
    }
  }
}
`;
