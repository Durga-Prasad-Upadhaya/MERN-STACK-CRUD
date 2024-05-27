import axios from "axios";
import { withHeaders } from "./util";

export const getAGoogleUser = async (id) => {
  const response = await axios.get(
    `http://localhost:5000/api/v1/auth/googleUsers/${id}`,
    withHeaders()
  );
  return response;
};

export const getAllGoogleUsers = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/v1/auth/googleUsers",
    withHeaders()
  );
  return response;
};
