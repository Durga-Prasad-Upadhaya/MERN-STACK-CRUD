import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/userService";
import { jwtDecode } from "jwt-decode";

export const DropdownLoggedIn = ({ setDropdown }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const cbid = sessionStorage.getItem("cbid");

  function handleLogout() {
    logout();
    setDropdown(false);
    navigate("/");
  }

  return (
    <div>
      <li>
        <Link
          className="dropdown-item"
          onClick={() => setDropdown(false)}
          to={`/view/${cbid}`}
        >
          My Profile
        </Link>
      </li>
      <li>
        <Link
          className="dropdown-item"
          onClick={() => setDropdown(false)}
          to="/read"
        >
          DashBoard
        </Link>
      </li>
      {token && jwtDecode(token).isAdmin ? (
        <div>
          <li>
            <Link
              className="dropdown-item"
              onClick={() => setDropdown(false)}
              to="/setting"
            >
              Setting
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              onClick={() => setDropdown(false)}
              to="/feedback"
            >
              Feedback
            </Link>
          </li>
        </div>
      ) : (
        ""
      )}
      <div className="btn dropdown-item">
        <span onClick={handleLogout}>Logout</span>
      </div>
    </div>
  );
};
