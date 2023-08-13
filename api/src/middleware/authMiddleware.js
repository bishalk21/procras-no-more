import { findExistingUser } from "../model/users/UserModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const user = await findExistingUser({ _id: authorization });

      if (user?._id) {
        req.userInfo = user;
        return next();
      }
    }
    res.status(403).json({
      status: "error",
      message: "Invalid authorization",
    });
  } catch (error) {
    next(error);
  }
};
