import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserWithCredentials } from "../auth/authSlice";

export default function Login() {
  const { status, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const loginHandler = async () => {
    const response = await dispatch(
      loginUserWithCredentials({
        email,
        password,
      })
    );
    console.log(response);
    if (response.error) {
      setError(true);
    }
  };

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="text-gray-50 w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col w-full max-w-md mx-8">
        <img
          className="w-10 my-6"
          src="/icons/finsight.svg"
          alt="finsight logo"
        />
        <p className="w-full font-bold text-3xl my-4">
          Log in to Finsight Socials
        </p>
        <form className="w-full">
          <input
            type="text"
            value={email}
            placeholder="Email"
            className="font-medium text-xl bg-gray-800 py-3 px-4 my-2 rounded-xl w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="font-medium text-xl bg-gray-800 py-3 px-4 my-2 rounded-xl w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="font-bold text-xl bg-gray-100 text-gray-900 py-3 px-4 mt-4 rounded-xl w-full"
            onClick={(e) => {
              e.preventDefault();
              loginHandler();
            }}
          >
            Log In
          </button>
        </form>
        {error && (
          <p className="fixed top-0 bg-red-600 bg-opacity-70 rounded-2xl py-3 px-6 font-bold text-2xl my-6">
            Invalid Credentials
          </p>
        )}
      </div>
    </div>
  );
}
