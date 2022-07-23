import { getCategory, postCategory } from "../controllers/categoryController.js";
import { Router } from "express";


const router = Router()

router.get('/categories', getCategory)
router.post('/categories', postCategory)

export default router