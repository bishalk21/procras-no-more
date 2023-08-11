import UserSchema from "./UserSchema.js";

export const insertNewUser = (user) => {
  return UserSchema(user).save();
};
