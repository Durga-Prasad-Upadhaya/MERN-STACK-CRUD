import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@desc Register a User
//@route POST /api/users/register
//@access public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username | !email | !password)
    res.status(500).json({ message: "Missing Fields!" });
  else {
    try {
      const userAvailable = await User.findOne({ email });
      if (userAvailable) res.json({ message: "User Already Registered!" });
      else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await User.create({
          username,
          email,
          password: hashedPassword,
          isGoogle: false,
          isAdmin: false,
        });
        if (response)
          res
            .status(201)
            .json({ message: "User Successfully Created. Now, Login!" });
        else res.status(500).json({ message: "Unable to Create New User!" });
      }
    } catch (error) {}
  }
};

//@desc Login User
//@route POST /api/users/login
//@access public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All Fields are Mandatory" });
  } else {
    try {
      const user = await User.findOne({ email });
      if (user) {
        const userDetails = {
          id: user._id,
          username: user.username,
          email: user.email,
          isGoogle: user.isGoogle,
          isAdmin: user.isAdmin,
        };
        if (await bcrypt.compare(password, user.password)) {
          const accessToken = jwt.sign(
            userDetails,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            accessToken: accessToken,
            id: user._id,
          });
        } else res.status(401).json({ message: "Invalid Password!" });
      } else {
        res.status(401).json({ message: "You Haven't Registed Yet?" });
      }
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
};

//@desc Get All Local Users
//@route GET /api/v1/users/fetch
//@access private
const fetchUsers = async (req, res) => {
  let users = await User.find({});
  users = users.filter((user) => user.isAdmin != true);
  res.status(200).json(users);
};

const fetchAUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    const newUser = {
      username: user.username,
      email: user.email,
    };
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

//@desc Delete User
//@route DELETE /api/v1/users/:id
//@access private
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndRemove(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!!" });
  }
};

export { registerUser, loginUser, fetchUsers, fetchAUser, deleteUser };
