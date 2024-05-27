import axios from "axios";
import { withHeaders } from "./util";

export const login = async (authDetails) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/user/login",
    authDetails
  );
  return response;
};

export const register = async (authDetails) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/user/register",
    authDetails
  );
  return response;
};

export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("cbid");
  if (sessionStorage.getItem("isGoogle")) sessionStorage.removeItem("isGoogle");
  if (sessionStorage.getItem("isAdmin")) sessionStorage.removeItem("isAdmin");
}

export const getAUser = async () => {
  const cbid = sessionStorage.getItem("cbid");
  const response = await axios.get(
    `http://localhost:5000/api/v1/user/${cbid}`,
    withHeaders()
  );
  return response;
};

export const getAllUsers = async () => {
  const response = await axios.get(
    `http://localhost:5000/api/v1/user`,
    withHeaders()
  );
  return response;
};
