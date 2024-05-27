import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="text-center mt-3 mb-3">
      (C) It World Education
      <Link to="https://www.linkedin.com/in/itworldeducation/">
        <i
          className="fa fa-linkedin-square ms-3"
          style={{ fontSize: "30px", color: "blue" }}
        ></i>
      </Link>
      <Link to="https://www.instagram.com/itworldeducation/">
        <i
          className="fa fa-instagram ms-3"
          style={{ fontSize: "30px", color: "red" }}
        ></i>
      </Link>
    </div>
  );
};
