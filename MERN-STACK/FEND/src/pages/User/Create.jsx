import { Paper } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAnEmployee } from "../../services/empService";

export const Create = () => {
  const [ename, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const empDetails = {
      ename,
      email,
      emobile,
    };
    try {
      const response = await createAnEmployee(empDetails);
      navigate("/login");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Paper sx={{ width: "50vw" }} className="p-5 mt-5">
        <div className="d-flex justify-content-between m-2">
          <h2>Create</h2>
        </div>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <Link to="/read">
            <button className="btn btn-success mx-2"> Back </button>
          </Link>
        </form>
      </Paper>
    </div>
  );
};
