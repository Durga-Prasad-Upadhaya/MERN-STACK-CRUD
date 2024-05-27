import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../api/api";
import { useEffect, useRef, useState } from "react";
import { useTitle } from "../../hooks/useTitle";
import { jwtDecode } from "jwt-decode";
import { login } from "../../services/userService";

export const Login = () => {
  useTitle("Login");
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authDetails = {
        email: email.current.value,
        password: password.current.value,
      };
      const response = await login(authDetails);
      sessionStorage.setItem("token", response.data.accessToken);
      sessionStorage.setItem("cbid", response.data.id);

      if (response && jwtDecode(response.data.accessToken).isAdmin) {
        setIsAdmin(true);
        navigate("/setting");
        toast.success("Welcome, Admin");
      } else {
        setIsAdmin(false);
        navigate("/read");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token") && isAdmin === true) navigate("/admin");
    else if (sessionStorage.getItem("token") && isAdmin === false)
      navigate("/read");
  }, [navigate, isAdmin]);

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const response = await googleAuth(authResult.code);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("cbid", response.data.id);        
        navigate("/read");
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="element-center container">
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="d-flex justify-content-center">
          <h3>Create New Account</h3>
          <Link to="/signup" className="btn btn-primary btn-block mx-3">
            Sign Up
          </Link>
        </div>

        <div className="form-outline mb-4 my-5">
          <label className="form-label">Email address</label>
          <input
            ref={email}
            type="text"
            className="form-control"
            required
            autoComplete="off"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Password</label>
          <input
            ref={password}
            type="password"
            className="form-control"
            required
            autoComplete="off"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-danger btn-block mb-4">
            Sign In
          </button>
          <h4 className="mt-2">Or</h4>
          <div className="my-2">
            <Link
              onClick={(e) => {
                e.preventDefault();
                googleLogin();
              }}
            >
              <i
                className="fa fa-google ms-3"
                style={{ fontSize: "30px", color: "blue" }}
              ></i>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
