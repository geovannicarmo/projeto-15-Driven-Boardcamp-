import { Router } from "express";
import { getGames, postGames, getGamesParams } from "../controllers/gameController.js";


const router = Router()

router.get('/games/:name', getGamesParams)
router.get('/games', getGames)
router.post('/games', postGames)

export default router



