import 'express-async-errors'
import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import responseError from './middleware/response-error';
import { controllersStartup } from './config/controllers-startup';
import { DBconnectionTest } from './config/db-connection';

const port = process.env.PORT

const app = express()


app.use(express.json())

controllersStartup(app)

app.use(responseError)

DBconnectionTest()

app.listen(port, ()=> console.log('Server is running. \nPort: ', port))