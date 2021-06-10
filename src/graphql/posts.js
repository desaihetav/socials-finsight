export const GET_ALL_POSTS = `
query ($user_id: uuid!) {
    posts {
      content
      id
      created
      likes(where: {user_id: {_eq: $user_id}}) {
        user {
          id
        }
      }
      saves(where: {user_id: {_eq: $user_id}}) {
        user {
          id
        }
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      saves_aggregate {
        aggregate {
          count
        }
      }
      user {
        image_url
        name
        username
      }
    }
  }
`;

export const LIKE_POST = `
mutation ($post_id: uuid!, $user_id: uuid!) {
    insert_likes_one(object: {post_id: $post_id, user_id: $user_id}) {
        post_id,
        user_id
    }
}
`;

export const UNLIKE_POST = `
mutation ($post_id: uuid!, $user_id: uuid!) {
    delete_likes(where: {post_id: {_eq: $post_id}, user_id: {_eq: $user_id}}) {
      returning {
        post_id
        user_id
      }
    }
  }  
`;
