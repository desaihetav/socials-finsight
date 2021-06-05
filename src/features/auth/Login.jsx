import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { gql, useQuery } from "@apollo/client";

export default function Login() {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();

  const loginHandler = async () => {
    await loginWithRedirect();
    const token = await getAccessTokenSilently();
    console.log(token);
  };

  // const FETCH_PRIVATE_TODOS = gql`
  //   query fetchPrivateTodos {
  //     todos {
  //       id
  //       title
  //     }
  //   }
  // `;

  // const { loading, error, data } = useQuery(FETCH_PRIVATE_TODOS);

  // if (loading) return <h1>Loading...</h1>;

  // console.log(data?.todos);

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated]);

  return (
    <div>
      <button onClick={loginHandler}>Log In</button>
    </div>
  );
}
