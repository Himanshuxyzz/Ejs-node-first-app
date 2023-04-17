import express from "express";
const router = express.Router();
import {
  createUser,
  getMyprofile,
  login,
  logout
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

// router.get("/all", getAllusers);

router.post("/new", createUser);
router.post("/login", login);
router.get("/logout", logout);


// router.route("/userid/:id").get(getMyprofile);
router.get("/me",isAuthenticated, getMyprofile);

// router.get("/userid/:id",getUserDetailById );

// router.put("/userid/:id", UpdateUserDetailById);

// router.delete("/userid/:id", deleteUserDetailById);

export default router;
