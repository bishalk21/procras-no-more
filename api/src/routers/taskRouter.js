import express from "express";
import {
  deleteAllTask,
  deleteTask,
  getTask,
  insertTask,
  updateTask,
  updateTaskAll,
} from "../model/tasks/TaskModel.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const result = await insertTask(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "The new Task has been added",
          result,
        })
      : {
          status: "success",
          message: "Sorry, the task cannot be added",
        };
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const filter = {
      UserID: authorization,
    };

    const tasks = (await getTask(filter)) || [];
    res.json({
      status: "success",
      message: "task by user id",
      tasks,
    });
  } catch (error) {
    next(error);
  }
});

// router.get("/:_id?", async (req, res, next) => {
//   try {
//     const { _id } = req.params;
//     const result = _id ? await getTaskById(_id) : await getTask(filter);
//     res.json({
//       status: "success",
//       message: "return from get method, task router",
//       result,
//     });
//   } catch (error) {
//     error.status = 500;
//     next(error);
//   }
// });

router.patch("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { _id, type } = req.body;

    if (authorization || _id || type) {
      // if user is logged in and has valid id
      const filter = {
        UserID: authorization,
        _id,
      };
      const update = { type: type }; // Update the type field
      const options = { new: true }; // Return the updated document
      const result = await updateTask(filter, update, options);

      if (result?._id) {
        return res.json({
          status: "success",
          message: "successfully updated task",
          result,
        });
      }
    }
    return res.json({
      status: "error",
      message: "Invalid Credentials",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.patch("/:_id", async (req, res, next) => {
  try {
    // console.log("Received PATCH request:", req.params);
    const { authorization } = req.headers;

    const { task, hours, date, type } = req.body;
    const { _id } = req.params; // Access _id directly from req.params

    const updatedTask = {
      task,
      hours,
      date,
      type,
    };

    if (authorization || _id || updatedTask) {
      const filter = {
        UserID: authorization,
        _id,
      };
      const result = await updateTaskAll(_id, updatedTask);
      if (result?._id) {
        return res.json({
          status: "success",
          message: "successfully updated task",
          result,
        });
      }
    }
    return res.json({
      status: "error",
      message: "Invalid Credentials",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { _id } = req.params;

    if (authorization || _id) {
      // if user is logged in and has valid id
      const filter = {
        UserID: authorization,
        _id,
      };

      const result = await deleteTask(filter);

      if (result?._id) {
        return res.json({
          status: "success",
          message: "Transaction deleted successfully",
        });
      }
    }

    return res.json({
      status: "error",
      message: "Invalid Credentials",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const ids = req.body;
    const result = await deleteAllTask(ids);
    res.json({
      status: "success",
      message: "successfully deleted the task",
      result,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

export default router;
