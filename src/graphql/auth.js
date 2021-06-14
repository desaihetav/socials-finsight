export const LOGIN_USER = `
  query ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

export const SIGNUP_USER = `
mutation ($email: String!, $name: String!, $password: String!, $username: String!) {
  signup(email: $email, name: $name, password: $password, username: $username) {
    id
    token
  }
}
`;
