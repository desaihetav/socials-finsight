export const LOGIN_USER = `
  query ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;
