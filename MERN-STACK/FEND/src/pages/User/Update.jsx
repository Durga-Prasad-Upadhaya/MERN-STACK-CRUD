import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateAnEmployee } from "../../services/empService";
import { toast } from "react-toastify";

export const Update = () => {
  const [id, setId] = useState(0);
  const [ename, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emobile, setMobile] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("ename"));
    setEmail(localStorage.getItem("email"));
    setMobile(localStorage.getItem("emobile"));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const empDetails = {
      ename,
      email,
      emobile,
    };
    try {
      const e = await updateAnEmployee(id, empDetails);
      navigate("/read");
      toast.success(e.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Paper sx={{ width: "50vw" }} className="p-5 mt-5">
        <h2>Update</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={ename}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              type="email"
              className="form-control"
              value={emobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mx-2"
            onClick={handleUpdate}
          >
            Update
          </button>
          <Link to="/read">
            <button className="btn btn-success mx-2"> Back </button>
          </Link>
        </form>
      </Paper>
    </div>
  );
};
