import express from "express";
const router = express.Router();
import {
  getAllusers,
  createUser,
  special,
  getUserDetailById,
  UpdateUserDetailById,
  deleteUserDetailById,
} from "../controllers/user.js";

router.get("/all", getAllusers);

router.post("/new", createUser);

router.get("/userid/special", special);

router
  .route("/userid/:id")
  .get(getUserDetailById)
  .put(UpdateUserDetailById)
  .delete(deleteUserDetailById);

// router.get("/userid/:id",getUserDetailById );

// router.put("/userid/:id", UpdateUserDetailById);

// router.delete("/userid/:id", deleteUserDetailById);

export default router;
