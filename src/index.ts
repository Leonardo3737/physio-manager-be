import 'express-async-errors'
import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import responseError from './middleware/response-error';
import cors from 'cors';
import { controllersStartup } from './config/controllers-startup';
import { DBconnectionTest } from './config/db-connection';
import { authMiddleware } from './middleware/auth.middleware';

const port = Number(process.env.PORT)

const app = express()


app.use(express.json())
app.use(cors())

app.use(authMiddleware)



controllersStartup(app)

app.use(responseError)

DBconnectionTest()

app.listen(port, ()=> console.log('Server is running. \nPort: ', port))