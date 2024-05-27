import axios from "axios";
import { withHeaders } from "./util";

export const feebackMail = async (msgDetails) => {
    const e = await axios.post(
      "http://localhost:5000/api/v1/email",
      msgDetails     
    );
    return e;
  };
  
  export const getAllFeeback=async()=>{
    const e = await axios.get("http://localhost:5000/api/v1/email", withHeaders());
    return e;
  }

  export const getAFeeback=async(id)=>{
    const e = await axios.get(`http://localhost:5000/api/v1/email/${id}`, withHeaders());
    return e;
  }

  export const deleteAFeeback=async(id)=>{
    const e = await axios.delete(`http://localhost:5000/api/v1/email/${id}`, withHeaders());
    return e;
  }