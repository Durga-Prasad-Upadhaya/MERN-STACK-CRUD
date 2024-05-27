import { Link } from "react-router-dom";

export const DropdownLoggedOut = ({ setDropdown }) => {
  return (
    <div>
      <li>
        <Link
          className="dropdown-item"
          onClick={() => setDropdown(false)}
          to="/login"
        >
          Login
        </Link>
      </li>
    </div>
  );
};
