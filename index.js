// require("dotenv").config();
import * as dotenv from "dotenv";
dotenv.config();
// const http = require("http");
// import http from "http";

// import exportingData from "./testExport.js"; //you can use any name rather than the same name vairable which you are exporting from the other file.

// import {exportingData1,exportingData2,exportingData3} from "./testExport.js"

// import { exportingData3 } from './testExport.js';

// import exportingData, {
//   exportingData1,
//   exportingData2,
//   exportingData3,
// } from "./testExport.js";

// import * as exportObj from "./testExport.js"

// console.log(http);
// console.log(exportingData," ",exportingData1," " ," ",exportingData2," ",exportingData3);

// console.log(exportObj)

// import {randomNumber} from './features.js';

// console.log(randomNumber())

// import fs from "fs"

// import path from "path"

// console.log(path.dirname("./login/index.js"))

// const login = fs.readFileSync("./login.html");

// const server = http.createServer((req, res) => {
//       console.log(req.method);
//     if (req.url == '/') {
// res.end("<h1>Hello from vanilla server</h1>");

// fs.readFile("./login.html",(err,data) => {
//     res.end(data)
// })

// res.end(login)
//         res.end("login")
//     } else if (req.url == '/about') {
//         res.end("<h1>Hello from about page</h1>");
//     } else if (req.url == "/contact") {
//         res.end("<h1>Hello from contact page</h1>");
//     } else {
//         res.end("<h1>Page not found</h1>");

//     }
// });

// server.listen(PORT, () => {
//     console.log(`server is running at ${PORT}`);
// });
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

mongoose
  .connect(`${process.env.DB_CONN_URL}`, {
    dbName: "test_backend",
  })
  .then(() => {
    console.log("Database is running");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

import express from "express";
// import fs from "fs"
import path from "path";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

const app = express();
const PORT = process.env.PORT || 4232;
app.set("view engine", "ejs");

app.use(express.static(path.join(path.resolve(), "public")));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const users = [];

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded._id);
    next();
  } else {
    // res.render("login", {
    //   heading: "Login",
    // });
    res.redirect("/login");
  }
};

// app.get("/", (req, res) => {
//   const { token } = req.cookies;
//   console.log(token);

//     if (!token) {
//       res.render("login.ejs", {
//         heading: "himanshu",
//       });
//     } else {
//       res.render("logout", {
//         heading: "Logout",
//       });
//     }
// });

app.get("/", isAuthenticated, (req, res) => {
  console.log(req.user);
  res.render("logout", {
    name: req.user.name,
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

// app.get("/", (req, res) => {
// res.send("<h1>Heyyya! </h1>");
// res.sendStatus(404) not found
// res.sendStatus(50) internal error
// res.sendStatus(400) bad request
// res.status(400).json({
//     "success":true,
//     "product":[]
// })

// const file = fs.readFileSync("./login.html")

// console.log(path.resolve())

//   const pathLocation = path.resolve();
// console.log(path.join(pathLocation,"login.html"))
// res.status(400).sendFile(path.join(pathLocation, "login.html"));

//   res.render("login.ejs", {
// heading: "Himanshu !",
//   });
// });

// app.get("/", (req, res) => {
//   res.sendFile("index.html")
//   res.sendFile("index");
// });

// app.get("/success", (req, res) => {
//   res.render("success");
// });

// app.post("/", (req, res) => {
//   if (req.body) {
//     users.push({ name: req.body.name, email: req.body.email });
//     console.log(users);
// res.send({
//   message: "Form submitted successfully",
// });

// res.render("success")
//     res.redirect("/success");
//   } else {
//     res.send({
//       message: "Form not submitted",
//     });
//   }
// });

// app.post("/add", (req, res) => {
//   User.create({
//     name: req.name,
//     email: req.body.email,
//   })
//     .then(() => {
//       res.json({
//         message: "Data saved successfully",
//       });
//     })
//     .then((error) => {
//       console.log(error);
//     });
// });

// app.post("/add", async (req, res) => {
//   const { name, email } = req.body;

//   await User.create({
//     name: name,
//     email: email,
//   });
//   res.json({
//     message: "Data saved successfully",
//   });
// });

// app.post("/login", async (req, res) => {
//   const { name, email } = req.body;

//   let user = await User.findOne({ email });
//   if (!user) {
//     return res.redirect("/register");
//   }

//   user = await User.create({
//     name,
//     email,
//   });

//   const token = jwt.sign(
//     {
//       _id: user._id,
//     },
//     process.env.JWT_SECRET
//   );

//   console.log(`the generated token is ${token}`);

//   res.cookie("token", token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + 60 * 1000),
//   });
//   res.redirect("/");
// });

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.redirect("/login");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  console.log(`the generated token is ${token}`);

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    return res.redirect("/register");
  }

  //   const isMatch = user.password == password;
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.render("login", {
      email,
      message: "incorrect password",
    });
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

// app.get("/add", (req, res) => {
//   console.log(process.env.DB_CONN_URL);
//   User.create({
//     name: "himanshu",
//     email: "himanshuxyzz@gmail.com",
//   }).then(() => {
//     res.send("noiceee");
//   });
// });

// app.get("/users", (req, res) => {
//   res.json({
//     users,
//   });
// });

// app.get("/getProducts", (req, res) => {
// res.send("<h1>Heyyya! </h1>");
// res.sendStatus(404) not found
// res.sendStatus(50) internal error
// res.sendStatus(400) bad request
//   res.json({
//     success: true,
//     product: [],
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
