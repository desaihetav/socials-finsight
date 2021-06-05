import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function Profile() {
  const { logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const logoutHandler = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div>
      <button onClick={logoutHandler}>Log Out</button>
      <br />
      {isAuthenticated && (
        <div>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <p>{JSON.stringify(getAccessTokenSilently())}</p>
          {console.log(user)}
        </div>
      )}
    </div>
  );
}

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <h1>Loading...</h1>,
});
