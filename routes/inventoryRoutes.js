import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {createInventoryController, getDonarsController, getHospitalController, getInventoryController, getInventoryHospitalController, getOrganisationController, getOrganisationForHospitalController, getRecentInventoryController} from "../controllers/inventoryController.js";

const router = express.Router();

//Add inventory: ||Post
router.post("/create-inventory",authMiddleware, createInventoryController );

//Get all blood records: ||GET
router.get("/get-inventory", authMiddleware, getInventoryController);

//Get recent blood records: ||GET
router.get("/get-recent-inventory", authMiddleware, getRecentInventoryController);

//Get hospital blood records: ||POST
router.post("/get-inventory-hospital", authMiddleware, getInventoryHospitalController);

//Get Donar records: ||GET
router.get("/get-donars", authMiddleware, getDonarsController);

//Get Hospital records: ||GET
router.get("/get-hospitals", authMiddleware, getHospitalController);

//Get Organisation records: ||GET
router.get("/get-organisation", authMiddleware, getOrganisationController);

//Get Organisation records: ||GET
router.get("/get-organisation-for-hospital", authMiddleware, getOrganisationForHospitalController);

export default router;