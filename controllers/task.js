import ErrorHandler, { errorMiddlewares } from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      sucess: true,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      // return res.status(404).json({
      //   success: false,
      //   message: "Invalid id",
      // });
      // return next(new Error("Nice"));
      return next(new ErrorHandler("Task not found", 404));
    }
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated!",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      // return res.status(404).json({
      //   success: false,
      //   message: "Invalid id",
      // });
      // return next(new Error("Nice"))
      // return next(new Error("Invalid Id"));
      // return next(new Error("task not found"));
      return next(new ErrorHandler("task not found", 404));
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
