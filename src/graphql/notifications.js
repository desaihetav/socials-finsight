export const GET_NOTIFICATIONS = `
query ($receiver_id: uuid!) {
    notifications(where: {receiver_id: {_eq: $receiver_id}}) {
      id
      sender {
        id
        name
      }
      receiver {
        id
      }
      type
      link
    }
  }    
`;
