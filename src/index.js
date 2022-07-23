import chalk from 'chalk'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import categoryRoute from './routes/categoryRoute.js'
import gameRouter from './routes/gameRouter.js'
import customersRout from './routes/customersRout.js'

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use(categoryRoute)
app.use(gameRouter)
app. use(customersRout)


const PORT = process.env.PORT





app.listen(PORT, ()=>console.log(chalk.yellow(`server run in PORT ${PORT}`)))