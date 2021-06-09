import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserWithCredentials } from "../auth/authSlice";

export default function Login() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async () => {
    dispatch(
      loginUserWithCredentials({
        email: "hetav.desai20@gmail.com",
        password: "pass123",
      })
    );
  };

  useEffect(() => {
    isAuthenticated && navigate("/profile");
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <button onClick={loginHandler}>Log In</button>
    </div>
  );
}
