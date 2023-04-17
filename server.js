import { app } from "./app.js";
import { connectDb } from "./config/db.js";
const PORT = process.env.PORT || 7979;

connectDb();

app.listen(PORT, () => {
  console.log(
    `SERVER RUNNING AT PORT '${PORT}' 🚀 in ${process.env.NODE_ENV} Mode ${
      process.env.NODE_ENV == "Development" ? "👾" : "✅"
    }`
  );
});
