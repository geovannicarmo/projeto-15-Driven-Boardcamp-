import { Router } from "express";
import { searchRentals } from "../controllers/rentals/searchRentals.js";
import { addRentals, finishRentals, deleteRentals } from "../controllers/rentals/postRentalsControllers.js";

const router = Router()

router.get('/rentals', searchRentals)
router.post('/rentals', addRentals)
router.post('/rentals/:id/return', finishRentals)
router.delete('/rentals/:id', deleteRentals)

export default router

