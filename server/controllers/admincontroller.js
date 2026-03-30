import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import { Project } from "../models/project.js";
import { SupervisorRequest } from "../models/supervisorRequest.js";
import * as userServices from "../services/userService.js";
import * as projectServices from "../services/projectServices.js";

export const createStudent = asyncHandler(async (req, res, next) => {
  const { name, email, password, department } = req.body;
  if (!name || !password || !department) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }
  const user = await userServices.createUser({
    name,
    email,
    password,
    department,
    role: "Student",
  });
  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: { user },
  });
});

export const updateStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.param;
  const updateData = { ...req.body };
  delete updateData.role; //Prevent role update

  const user = await userServices.updateUser(id, updateData);
  if (!user) {
    return next(new ErrorHandler("Student not Found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Student update successfully",
    data: { user },
  });
});

export const deleteStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userServices.getUserById(id);
  if (!user) {
    return next(new ErrorHandler("Student not found", 404));
  }
  if (user.role !== "Student") {
    return next(new ErrorHandler("User is not a Student", 400));
  }
  await userServices.deleteUser(id);
  res.status(200).json({
    success: true,
    message: "Student deleted Successfully",
  });
});

export const createTeacher = asyncHandler(async (req, res, next) => {
  const { name, email, password, department, maxStudents, experties } =
    req.body;
  if (!name || !password || !department || !maxStudents || !experties) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }
  const user = await userServices.createUser({
    name,
    email,
    password,
    department,
    maxStudents,
    experties: Array.isArray(experties)
      ? experties
      : typeof experties === "string" && experties.trim() !== ""
        ? experties.split(",").map((s) => s.trim())
        : [],
    role: "Teacher",
  });
  res.status(201).json({
    success: true,
    message: "Teacher created successfully",
    data: { user },
  });
});

export const updateTeacher = asyncHandler(async (req, res, next) => {
  const { id } = req.param;
  const updateData = { ...req.body };
  delete updateData.role;     //Prevent role update

  const user = await userServices.updateUser(id, updateData);
  if (!user) {
    return next(new ErrorHandler("Teacher not Found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Teacher update successfully",
    data: { user },
  });
});

export const deleteTeacher = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userServices.getUserById(id);
  if (!user) {
    return next(new ErrorHandler("Teacher not found", 404));
  }
  if (user.role !== "Teacher") {
    return next(new ErrorHandler("User is not a Teacher", 400));
  }
  await userServices.deleteUser(id);
  res.status(200).json({
    success: true,
    message: "Teacher delete Successfully",
  });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userServices.getAllUsers();
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: { users },
  });
});

export const getAllProjects= asyncHandler(async (req, res, next) => {
  const projects= await projectServices.getAllProjects();
  console.log(projects)
  res.json({
    success:true,
    message:"Project fetched successfully",
    data:{project},
  });
});

export const assignSupervisor = asyncHandler(async (req, res, next) => {const [
    totalStudents,
    totalTeachers,
    totalProjects,
    pendingRequests,
    completedprojects,
    pendingProjects,
  ] = await Promise.all([
    User.countDocuments({role: "Student"}),
    User.countDocuments({role: "Teacher"}),
    Project.countDocuments(),
    SupervisorRequest.countDocuments({status: "pending"}),
    Project.countDocuments({status: "completed"}),
    Project.countDocuments({status: "pending"}),
  ])

  res.status(200).json({
    success :true,
    message:"Admin Dashboard Stats Fetched",
    data:{
      stats: {
    totalStudents,
    totalTeachers,
    totalProjects,
    pendingRequests,
    completedprojects,
    pendingProjects,
      },
    },
  });
});

export const getDashboardStats = asyncHandler(async (req, res, next) => {});
