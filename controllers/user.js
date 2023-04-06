import { user } from "../models/user.js";

export const getAllusers = async (req, res) => {
  //   user.find({ name: "Abhi" });
  const users = await user.find({});
  // status code = 201 -> created
  res.status(201).cookie("test-cookie", "shazam").json({
    message: "All users fetched",
    success: true,
    users,
  });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.query);
  // const { keyword } = req.query;
  const keyword = req.query.keyword;
  console.log(keyword);

  await user.create({
    name,
    email,
    password,
  });

  res.cookie("hero", "batman").json({
    message: "Registerd successfully",
    success: true,
  });
};

export const special = (req, res) => {
  res.send("Nice working");
};

export const getUserDetailById = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  // console.log(id);
  // res.send(id)
  const User = await user.findById(id);
  // console.log(req.params);
  res.status(200).json({
    success: "true",
    User,
  });
};

export const UpdateUserDetailById = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  // console.log(id);
  // res.send(id)
  const User = await user.findById(id);
  // console.log(req.params);
  res.status(200).json({
    success: "updated",
    User,
  });
};

export const deleteUserDetailById = async (req, res) => {
  console.log(req.params);
  // const { id } = req.params;
  // console.log(id);
  // res.send(id)
  // const User = await user.findById(id);
  // console.log(req.params);
  res.status(200).json({
    success: "true",
    message: "deleted",
  });
};
