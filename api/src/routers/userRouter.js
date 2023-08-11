import express from "express";
import { insertNewUser } from "../model/users/UserModel.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const user = await insertNewUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message:
            "Your Account has been created successfully, please go to login page and enter your details!",
        })
      : res.json({
          status: "error",
          message:
            "An error has occurred while creating your account. Please try again",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
