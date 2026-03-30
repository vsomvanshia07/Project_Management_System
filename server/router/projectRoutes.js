import express from "express";
import { 
    downloadFile,
    getAllProjects,
 } from "../controllers/projectController.js";
 import {
    isAuthenticated,
    isAuthorized,
 } from "../middlewares/authMiddleware.js";

 const router = express.Router();

 router.get("/",isAuthenticated , isAuthorized("Admin").getAllProjects);
 router.get("/:projectId/files/:fileId/download",isAuthenticated,downloadFile);

 export default router
