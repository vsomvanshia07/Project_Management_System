import express from "express";
import {
  getAvailableSuperVisors,
  getStudentProject,
  getSupervisor,
  submitProposal,
  requestSupervisor,
  uploadFiles,
  getFeedback,
  getDashboardStats,
  downloadFile,
} from "../controllers/studentController.js";
import multer from "multer";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";

import { handleUploadError, upload } from "../middlewares/upload.js";

const router = express.Router();
router.get(
  "/project",
  isAuthenticated,
  isAuthorized("Student"),
  getStudentProject,
);

router.post(
  "/project-proposal",
  isAuthenticated,
  isAuthorized("Student"),
  submitProposal,
);

router.post(
  "/upload/:projectId",
  isAuthenticated,
  isAuthorized("Student"),
  upload.array("files", 10),
  handleUploadError,
  uploadFiles,
);

router.get(
  "/fetch-supervisors",
  isAuthenticated,
  isAuthorized("Student"),
  getAvailableSuperVisors,
);

router.get(
  "/Supervisors",
  isAuthenticated,
  isAuthorized("Student"),
  getSupervisor,
);

router.post(
  "/request-supervisor",
  isAuthenticated,
  isAuthorized("Student"),
  requestSupervisor,
);


router.get(
  "/feedback/:projectId",
  isAuthenticated,
  isAuthorized("student"),
  getFeedback
);

router.get(
  "/fetch-dashboard-stats",
  isAuthenticated,
  isAuthorized("student"),
  getDashboardStats
);
router.get(
  "/download/:projectId/:fileId",
  isAuthenticated,
  isAuthorized("student"),
  downloadFile
);
export default router;
