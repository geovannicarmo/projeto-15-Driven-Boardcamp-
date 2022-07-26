import { Router } from "express";
import { searchCustomers, searchCustomer } from "../controllers/customers/searchCustomers.js";
import { addCustomers,updateCustomers } from "../controllers/customers/postPutCustomers.js";

const router = Router()

router.get('/customers', searchCustomers)
router.get('/customers/:id', searchCustomer)
router.post('/customers', addCustomers)
router.put('/customers/:id', updateCustomers)

export default router