import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect(`${process.env.DB_CONN_URL}`, {
      dbName: "backend_api",
    })
    .then(() => {
      console.log("Database is running");
    })
    .catch((err) => {
      console.log(err);
    });
};
