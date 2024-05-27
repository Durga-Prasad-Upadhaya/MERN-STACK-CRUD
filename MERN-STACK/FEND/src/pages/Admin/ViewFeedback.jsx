import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/userService";
import { jwtDecode } from "jwt-decode";
import { getAFeeback } from "../../services/mailService";

export const ViewFeedback = () => {
  const [data, setData] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const getData = async () => {
    try {
      const e = await getAFeeback(id);
      if (token && jwtDecode(token).isAdmin) {
        setData(e.data);
      } else {
        logout();
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-5">
      <blockquote className="blockquote text-center">
        <p className="mb-4">{data.feedback}</p>
        <footer className="blockquote-footer">
          By <cite title="Source Title">{data.email}</cite>
        </footer>
      </blockquote>
      <div className="d-flex justify-content-center me-5">
        <Link to="/feedback">
          <button className="btn btn-success "> Back </button>
        </Link>
      </div>
    </div>
  );
};
