import { Router } from "express";
import { searchCustomers } from "../controllers/customers/searchCustomers.js";

const router = Router()

router.get('/customers', searchCustomers)
export default router