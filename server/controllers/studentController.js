import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import * as userServices from "../services/userService.js";
import * as projectService from "../services/projectServices.js";

export const getStudentProject = asyncHandler(async (req, res, next) => {
  const studentId = req.user._id;

  const project = await projectService.getProjectByStudentId(studentId);

  if (!project) {
    return res.status(200).json({
      success: true,
      data: { project: null },
      message: "No project found for this student",
    });
  }
  res.status(200).json({
    success: true,
    data: { project },
  });
});

export const submitProposal = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const studentId = req.user._id;

  const existingProject = await projectService.getProjectByStudentId(studentId);

  if (existingProject && existingProject.status !== "rejected") {
    return next(
      new ErrorHandler(
        "You already have an active project. You can only submit a new proposal if the previous one is rejected.",
        400,
      ),
    );
  }
});
