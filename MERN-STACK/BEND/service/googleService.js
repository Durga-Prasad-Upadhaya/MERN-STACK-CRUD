import { oauth2Client } from "./element/oauth2Client.js";
import axios from "axios";
import { googleToken } from "./element/googleToken.js";
import OAuthUser from "../model/googleModel.js";

export const googleLogin = async (req, res) => {
  const code = req.query.code;
  console.log(code);
  try {
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    let user = await OAuthUser.findOne({ email: userRes.data.email });
    if (!user) {
      user = await OAuthUser.create({
        username: userRes.data.name,
        email: userRes.data.email,
        isGoogle: true,
        isAdmin: false,
      });
    }
    const response = googleToken(user);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const fetchAllGoogleUsers = async (req, res) => {
  try {
    const response = await OAuthUser.find({});
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchAGoogleUser = async (req, res) => {
  try {
    const response = await OAuthUser.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAGoogleUser = async (req, res) => {
  const id = req.params.id;
  try {
    await OAuthUser.findByIdAndRemove(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
