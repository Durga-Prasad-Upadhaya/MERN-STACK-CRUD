import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { withHeaders } from "../../services/util";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllUsers } from "../../services/userService";
import { getAllGoogleUsers } from "../../services/googleService";
import { jwtDecode } from "jwt-decode";

export const Setting = () => {
  const [localUsers, setLocalUsers] = useState([]);
  const [googleUsers, setGoogleUsers] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const getLocalUsers = async () => {
    try {
      const response = await getAllUsers();
      setLocalUsers(response.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const getGoogleUsers = async () => {
    try {
      const response = await getAllGoogleUsers();
      setGoogleUsers(response.data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (token && jwtDecode(token).isAdmin) {
      getLocalUsers();
      getGoogleUsers();
    } else navigate("/login");
  }, [navigate]);

  const deleteUser = async (user, id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/${
          user === "google" ? `auth/${id}` : `user/${id}`
        }`,
        withHeaders()
      );

      getLocalUsers();
      getGoogleUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-6 col-md-12 element-center flex-column ">
        <div className="display-6 my-3 lead">Local Users</div>
        {localUsers.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {localUsers?.map((data) => {
                return (
                  <tr key={data._id}>
                    <td>{data.username}</td>
                    <td>{data.email}</td>
                    <td>
                      <div className="text-trim">{data.password}</div>
                    </td>
                    <td>
                      <div
                        className="btn btn-danger"
                        onClick={() => {
                          deleteUser("user", data._id);
                        }}
                      >
                        <MdDeleteOutline />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center">No Local Users</div>
        )}
      </div>

      <div className="col-lg-6 col-md-12 h-100 element-center flex-column">
        <div className="display-6 my-3 lead">Google Users</div>
        {googleUsers.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {googleUsers?.map((data) => {
                return (
                  <tr key={data._id}>
                    <td>{data.username}</td>
                    <td>{data.email}</td>
                    <td>
                      <div
                        className="btn btn-danger"
                        onClick={() => {
                          deleteUser("google", data._id);
                        }}
                      >
                        <MdDeleteOutline />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center">No Google Users</div>
        )}
      </div>
    </div>
  );
};
