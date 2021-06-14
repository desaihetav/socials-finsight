import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUserWithCredentials, resetAuthStatus } from "../auth/authSlice";

export default function Signup() {
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(resetAuthStatus());
    isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    if (!/^[a-z0-9_-]{3,}$/i.test(name)) {
      setErrorMessage("Invalid Name. Must be at least 3 characters long.");
      return false;
    }
    if (!/^[a-z0-9_-]{3,20}$/i.test(username)) {
      setErrorMessage(
        "Invalid Username. Must be between 3 to 20 characters and not include spaces."
      );
      return false;
    }
    if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/i.test(email)) {
      setErrorMessage("Invalid Email");
      return false;
    }
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(email)) {
      setErrorMessage(
        "Invalid Password. Must be atleast 8 characters long and contain 1 uppercase, lowercase letter and number."
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const signupHandler = async () => {
    validateForm() &&
      (await dispatch(
        signupUserWithCredentials({
          email,
          password,
          name,
          username,
        })
      ));
  };

  return (
    <div className="text-gray-50 w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col w-full max-w-md mx-8">
        <img
          className="w-10 my-6"
          src="/icons/finsight.svg"
          alt="finsight logo"
        />
        <p className="w-full font-bold text-3xl my-4">
          Sign up for Finsight Socials
        </p>
        <form className="w-full">
          <input
            type="text"
            value={name}
            placeholder="Name"
            className="font-medium text-xl bg-gray-800 py-3 px-4 my-2 rounded-xl w-full"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={username}
            placeholder="Username"
            className="font-medium text-xl bg-gray-800 py-3 px-4 my-2 rounded-xl w-full"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
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
              signupHandler();
            }}
          >
            {status === "loading" ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {errorMessage !== "" && (
          <p className="fixed max-w-xs top-0 bg-red-600 bg-opacity-70 rounded-2xl py-3 px-6 font-semibold text-lg my-6">
            {errorMessage}
          </p>
        )}
        {status === "error" && (
          <p className="fixed max-w-xs top-0 bg-red-600 bg-opacity-70 rounded-2xl py-3 px-6 font-bold text-xl my-6">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
