import axios from "axios";
import { withHeaders } from "./util";

export const getAllEmployees = async () => {
  const e = await axios.get("http://localhost:5000/api/v1/emp", withHeaders());
  return e;
};

export const getAnEmployee = async (id) => {
  const e = await axios.get(
    `http://localhost:5000/api/v1/emp/${id}`,
    withHeaders()
  );
  return e;
};

export const deleteAnEmployee = async (id) => {
  const e = await axios.delete(
    `http://localhost:5000/api/v1/emp/${id}`,
    withHeaders()
  );
  return e;
};

export const updateAnEmployee = async (id, empDetails) => {
  const e = await axios.put(
    `http://localhost:5000/api/v1/emp/${id}`,
    empDetails,
    withHeaders()
  );
  return e;
};

export const createAnEmployee = async (empDetails) => {
  const e = await axios.post(
    "http://localhost:5000/api/v1/emp",
    empDetails,
    withHeaders()
  );
  return e;
};

