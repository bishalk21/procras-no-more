import express from "express";
import {
  deleteAllTask,
  deleteTask,
  getTask,
  getTaskById,
  insertTask,
  updateTask,
} from "../model/TaskModel.js";
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
          result,
        };
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const result = _id ? await getTaskById(_id) : await getTask();
    res.json({
      status: "success",
      message: "return from get method, task router",
      result,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const { _id, type } = req.body;
    const result = await updateTask(_id, type);

    res.json({
      status: "success",
      message: "successfully updated task",
      result,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// DELETE a single task by ID
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const result = await deleteTask(_id);
    res.json({
      status: "success",
      message: "Task deleted",
      result,
    });
  } catch (error) {
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
