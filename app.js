console.log("Welcome to the NODE JS api :)");
console.log("<------------------------------->");

import { config } from "dotenv";
// dotenv.config();
import express from "express";
import userRouter from "./routes/usersRoute.js";
import taskRouter from "./routes/taskRoutes.js";
import { errorMiddlewares } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import { connectDb } from "./config/db.js";
export const app = express();
// const PORT = process.env.PORT || 7979;
config({
  path: "./config/config.env",
});
// using middlewares to post data from the post request body either with postman or thunder client
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// using routes
app.get("/", (req, res) => {
  res.send("<h1>Hello from server</h1>");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// app.use((err, req, res, next) => {
//   // console.log(err);
//   // console.log(err.message)
//   return res.status(404).json({
//     success: false,
//     message: err.message,
//   });
// });
// using error middlewares
app.use(errorMiddlewares);
// connectDb();

// mongoose
//   .connect(`${process.env.DB_CONN_URL}`, {
//     dbName: "backend_api",
//   })
//   .then(() => {
//     console.log("Database is running");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const schema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// const user = mongoose.model("User", schema);

// app.get("/", (req, res) => {
//   res.send("Nice working");
// });

// app.get("/users/all", async (req, res) => {
//   //   user.find({ name: "Abhi" });
//   const users = await user.find({});
//   // status code = 201 -> created
//   res.status(201).cookie("test-cookie", "shazam").json({
//     message: "All users fetched",
//     success: true,
//     users,
//   });
// });

// app.post("/users/new", async (req, res) => {
//   const { name, email, password } = req.body;
//   // console.log(req.query);
//   // const { keyword } = req.query;
//   const keyword = req.query.keyword;
//   console.log(keyword);

//   await user.create({
//     name,
//     email,
//     password,
//   });

//   res.cookie("hero", "batman").json({
//     message: "Registerd successfully",
//     success: true,
//   });
// });

// app.get("/userid/special", (req, res) => {
//   res.json({
//     success: true,
//     message: "just joking",
//   });
// });

// /userid/:id/:msg req.params is used to get the parameters

// app.get("/userid/:id", async (req, res) => {
//   console.log(req.params);
//   const { id } = req.params;
//   // console.log(id);
//   // res.send(id)
//   const User = await user.findById(id);
//   // console.log(req.params);
//   res.status(200).json({
//     success: "true",
//     User,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`SERVER RUNNING AT PORT '${PORT}' 🚀`);
// });
