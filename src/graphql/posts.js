const POST_FIELDS = `
  content
  id
  user_id
  created
  parent_post
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
  reposts(where: {user_id: {_eq: $user_id}}) {
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
  reposts_aggregate {
    aggregate {
      count
    }
  }
  user {
    image_url
    name
    username
  }
`;

const INSERT_NOTIFICATION = `
insert_notifications_one(object: {link: $link, receiver_id: $receiver_id, sender_id: $sender_id, type: $type}) {
  id
}
`;

export const GET_ALL_POSTS = `
query ($user_id: uuid!) {
    posts {
      ${POST_FIELDS}
    }
    reposts {
      user {
        id
        name
      }
      post {
        ${POST_FIELDS}
      }
    }
  }
`;

export const LIKE_POST = `
mutation ($post_id: uuid!, $user_id: uuid!, $sender_id: uuid!, $receiver_id: uuid!, $type: String!, $link: String!) {
    insert_likes_one(object: {post_id: $post_id, user_id: $user_id}) {
        post_id,
        user_id
    }
    ${INSERT_NOTIFICATION}
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

export const SAVE_POST = `
mutation ($post_id: uuid!, $user_id: uuid!, $sender_id: uuid!, $receiver_id: uuid!, $type: String!, $link: String!) {
    insert_saves_one(object: {post_id: $post_id, user_id: $user_id}) {
        post_id,
        user_id
    }
    ${INSERT_NOTIFICATION}
}
`;

export const UNSAVE_POST = `
mutation ($post_id: uuid!, $user_id: uuid!) {
    delete_saves(where: {post_id: {_eq: $post_id}, user_id: {_eq: $user_id}}) {
      returning {
        post_id
        user_id
      }
    }
  }  
`;

export const REPOST_POST = `
mutation ($post_id: uuid!, $user_id: uuid!, $sender_id: uuid!, $receiver_id: uuid!, $type: String!, $link: String!) {
    insert_reposts_one(object: {post_id: $post_id, user_id: $user_id}) {
      user {
        id
        name
      }
      post {
        ${POST_FIELDS}
      }
    }
    ${INSERT_NOTIFICATION}
}
`;

export const UNREPOST_POST = `
mutation ($post_id: uuid!, $user_id: uuid!) {
    delete_reposts(where: {post_id: {_eq: $post_id}, user_id: {_eq: $user_id}}) {
      returning {
        post_id
        user_id
      }
    }
  }  
`;

export const CREATE_NEW_POST = `
mutation ($user_id: uuid!, $content: String!, $parent_post: uuid!) {
  insert_posts_one(object: {content: $content, user_id: $user_id, parent_post: $parent_post}) {
    ${POST_FIELDS}
  }
}
`;
