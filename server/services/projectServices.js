import { Project } from "../models/project.js";

export const getProjectByStudentId = async (studentId) => {
  return await Project({ student: studentId }).sort({ createdAt: -1 });
};
