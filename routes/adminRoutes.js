import express from "express";
import  authMiddelware from  "../middlewares/authMiddleware.js";
import {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
}from "../controllers/adminController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

//router object
const router = express.Router();

//Routes

//GET || DONAR LIST
router.get(
  "/donar-list",
  authMiddelware,
  adminMiddleware,
  getDonarsListController
);
//GET || HOSPITAL LIST
router.get(
  "/hospital-list",
  authMiddelware,
  adminMiddleware,
  getHospitalListController
);
//GET || ORG LIST
router.get("/org-list", authMiddelware, adminMiddleware, getOrgListController);
// ==========================

// DELETE DONAR || GET
router.delete(
  "/delete-donar/:id",
  authMiddelware,
  adminMiddleware,
  deleteDonarController
);

//EXPORT
export default router;