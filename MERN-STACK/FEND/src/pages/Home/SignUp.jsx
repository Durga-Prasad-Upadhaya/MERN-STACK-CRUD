import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useTitle } from "../../hooks/useTitle";
import { toast } from "react-toastify";
import { register } from "../../services/userService";

export const SignUp = () => {
  useTitle("SignUp");
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authDetails = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        isAdmin: false,
        isGoogle: false,
      };
      const response = await register(authDetails);
      navigate("/login");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="element-center container">
      <form
        className="mt-5"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <div className="d-flex justify-content-center">
          <h3>Have Already Account</h3>
          <Link to="/login" className="btn btn-warning btn-block mx-3">
            Sign In
          </Link>
        </div>

        <div className="form-outline mb-4 my-2">
          <label className="form-label">User Name</label>
          <input ref={username} type="text" className="form-control" required />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Email address</label>
          <input ref={email} type="text" className="form-control" required />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Password</label>
          <input ref={password} type="text" className="form-control" required />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Submit
        </button>
      </form>
    </div>
  );
};
