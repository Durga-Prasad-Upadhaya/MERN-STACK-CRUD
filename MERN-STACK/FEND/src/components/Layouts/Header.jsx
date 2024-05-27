import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { DropdownLoggedIn } from "../Elements/DropdownLoggedIn";
import { DropdownLoggedOut } from "../Elements/DropdownLoggedOut";
import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";

export const Header = () => {
  const [dropdown, setDropdown] = useState(true);
  const token = sessionStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand logo">
          <img src={Logo} alt="React Router Logo" />
          <span>ITE</span>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto ">
            <div className="dropdown-center">
              <div
                className="btn btn-outline-primary nav-item nav-link mx-2 "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => setDropdown(true)}
              >
                <BsFillPersonFill />
              </div>
              <div className="dropdown-menu">
                {dropdown &&
                  (token ? (
                    <DropdownLoggedIn setDropdown={setDropdown} />
                  ) : (
                    <DropdownLoggedOut setDropdown={setDropdown} />
                  ))}
              </div>
            </div>

            <NavLink to="/" className="nav-item nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-item nav-link">
              About
            </NavLink>

            <NavLink to="/contact" className="nav-item nav-link">
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
