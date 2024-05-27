import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAGoogleUser } from "../../services/googleService";
import photo from "../../assets/users/6566b8841d020eb2250437fb.jpg";
import { jwtDecode } from "jwt-decode";
import { getAUser } from "../../services/userService";

export const View = () => {
  const [data, setData] = useState("");
  const { id } = useParams();
  const token = sessionStorage.getItem("token");

  const getData = async () => {
    try {
      let response;

      if (jwtDecode(token).isGoogle) {
        response = await getAGoogleUser(id);
        response ? setData(response.data) : toast.error("Google User Failed!");
      } else {
        response = await getAUser(id);
        response ? setData(response.data) : toast.error("Local User Failed!");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row mt-5 my-5">
        <div className="col">
          <div className="container py-5">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-12 col-xl-12">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body text-center">
                    <div className="mt-3 mb-4">
                      <img
                        src={photo}
                        className="rounded-circle img-fluid"
                        style={{ width: "100px" }}
                        alt=""
                      />
                    </div>
                    <h4 className="mb-2"> {data.username} </h4>
                    <p className="text-muted mb-4">
                      {data.email} <span className="mx-2">|</span>
                      <Link className="btn" to="https://itworldeducation.org">
                        It World Education
                      </Link>
                    </p>

                    <Link
                      type="button"
                      className="btn btn-secondary btn-rounded btn-lg"
                      to="/read"
                    >
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col my-5 ms-5">
          <h4>Change Your Info</h4>
          <form>
            <div className="mb-3 mt-4">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                defaultValue={data.username}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                defaultValue={data.email}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="mb-3">
              <UploadButton />
            </div>

            <button type="submit" className="btn btn-primary ">
              Update
            </button>
            <Link to="/read">
              <button className="btn btn-success ms-4 "> Back </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
