import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { Search } from "../../components";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useTitle } from "../../hooks/useTitle";
import { deleteAnEmployee, getAllEmployees } from "../../services/empService";

export const Read = () => {
  useTitle("read");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [query, setQuery] = useState("");
  const keys = ["ename", "email", "emobile"];
  const [order, setOrder] = useState("");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await getAllEmployees();      
      if (token) setData(response.data);
    } catch (error) {
      navigate("/login");
    }
  };

  const handleDelete = async (id) => {
    try {
      const e = await deleteAnEmployee(id);
      toast.success(e.data.message);
      getData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filteredData = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
    );
  };

  const setToLocalStorage = (id, ename, email, emobile) => {
    localStorage.setItem("id", id);
    localStorage.setItem("ename", ename);
    localStorage.setItem("email", email);
    localStorage.setItem("emobile", emobile);
  };

  const sorting = (col) => {
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
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
    if (token) getData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {filteredData(data).length > 0 ? (
        <>
          <h3 className="text-center mt-5">EMPLOYEE MANAGEMENT</h3>
          <div className="d-flex">
            <button
              className="ms-auto me-5 btn btn-secondary"
              onClick={() => {
                navigate("/create");
              }}
            >
              Create
            </button>
          </div>
          <table className="text-center table" height="100">
            <thead>
              <tr>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    sorting("ename");
                  }}
                >
                  NAME {orderArrow()}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    sorting("email");
                  }}
                >
                  EMAIL {orderArrow()}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    sorting("emobile");
                  }}
                >
                  MOBILE {orderArrow()}
                </th>
                <th scope="col" colSpan="2">
                  ACTIONS
                </th>
              </tr>
            </thead>
            {filteredData(data)
              .slice(
                (page - 1) * rowsPerPage,
                (page - 1) * rowsPerPage + rowsPerPage
              )
              .map((eachData, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td width="20%">{eachData.ename}</td>
                      <td width="20%">{eachData.email}</td>
                      <td width="20%">{eachData.emobile}</td>

                      <td>
                        <div>
                          <Link to="/update">
                            <button
                              className="btn btn-success me-2"
                              onClick={() =>
                                setToLocalStorage(
                                  eachData._id,
                                  eachData.ename,
                                  eachData.email,
                                  eachData.emobile
                                )
                              }
                            >
                              Update
                            </button>
                          </Link>
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
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </>
      ) : (
        <div className="text-center mt-5">NO DATA AVAILABLE</div>
      )}
      <div className="d-flex justify-content-between">
        <Search query={query} setQuery={setQuery} setPage={setPage} />

        <Pagination
          count={Math.ceil(filteredData(data).length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          className="my-4"
        />
      </div>
    </>
  );
};
