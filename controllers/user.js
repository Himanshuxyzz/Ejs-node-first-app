import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
// import jwt  from "jsonwebtoken";

// export const getAllusers = async (req, res) => {
//   try {
//     const users = await User.find({});

//     res.json({
//       users,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid email or password", 400));

    // if (!user)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid email or password",
    //   });

    const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid email or password",
    //   });

    if (!isMatch)
      return next(new ErrorHandler("Invalid email or password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    // if (user)
    //   return res.status(404).json({
    //     success: false,
    //     message: "User Already Exist",
    //   });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPass = await bcrypt.hash(password, 10);
    // becuase we need userid to create token that's why we'll use let
    user = await User.create({ name, email, password: hashedPass });
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // res
    //   .status(201)
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     maxAge: 15 * 60 * 1000,
    //   })
    //   .json({
    //     success: true,
    //     message: "Registerd Successfully",
    //   });

    sendCookie(user, res, "Registerd Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyprofile = (req, res) => {
  try {
    // const id = "myid";

    // const { token } = req.cookies;
    // console.log(token);

    // if (!token)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Login first",
    //   });

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // const user = await User.findById(decoded._id);

    // const user = await User.findById(id);
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        message: "successfully logged out",
      });
  } catch (error) {
    next(error);
  }
};
