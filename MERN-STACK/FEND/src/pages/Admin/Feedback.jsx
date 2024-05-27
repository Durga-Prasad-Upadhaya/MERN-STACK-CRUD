import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Pagination } from "@mui/material";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useTitle } from "../../hooks/useTitle";
import { logout } from "../../services/userService";
import { deleteAFeeback, getAllFeeback } from "../../services/mailService";
import { jwtDecode } from "jwt-decode";

export const Feedback = () => {
  useTitle("Feedback");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const [order, setOrder] = useState("");

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const getData = async () => {
    try {
      const e = await getAllFeeback();
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

  const handleDelete = async (id) => {
    try {
      await deleteAFeeback(id);
      toast.success("Feedback Deleted");
      getData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sorting = (col) => {
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder("ASC");
    } else {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function orderArrow() {
    return order === "ASC" ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />;
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        <>
          {data.length > 0 ? (
            <>
              <h3 className="text-center mt-5 mb-4">ALL FEEDBACKS</h3>
              <table className="text-center table" height="100">
                <thead>
                  <tr>
                    <th
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        sorting("date");
                      }}
                    >
                      DATE {orderArrow()}
                    </th>
                    <th
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        sorting("email");
                      }}
                    >
                      EMAIL {orderArrow()}
                    </th>
                    <th>FEEDBACK</th>
                    <th scope="col" colSpan="2">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                {data
                  .slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  )
                  .map((eachData, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td width="20%">{eachData.date}</td>
                          <td width="20%">{eachData.email}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn btn-outline-success me-2 text-trim"
                              onClick={() =>
                                navigate(`/viewfeedback/${eachData._id}`)
                              }
                            >
                              {eachData.feedback}
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              Delete
                            </button>

                            <div
                              className="modal fade"
                              id="exampleModal"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Are Your Sure?
                                    </h5>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      data-bs-dismiss="modal"
                                      onClick={() => handleDelete(eachData._id)}
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </>
          ) : (
            <div className="text-center mt-5 fs-1">NO FEEDBACK AVAILABLE</div>
          )}
          <div className="d-flex justify-content-between">
            <Pagination
              count={Math.ceil(data.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              className="my-4"
            />
          </div>
        </>
      }
    </>
  );
};
