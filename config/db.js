import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect(`${process.env.DB_CONN_URL}`, {
      dbName: "backend_api",
    })
    .then((c) => {
      console.log(`Database is running 👨‍💻`)
      console.log(`Database is connected with ${c.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
