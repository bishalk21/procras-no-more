import UserSchema from "./UserSchema.js";

export const insertNewUser = (user) => {
  return UserSchema(user).save();
};

export const findExistingUser = (filter) => {
  return UserSchema.findOne(filter);
};
