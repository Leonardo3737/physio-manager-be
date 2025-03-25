import 'express-async-errors'
import express from 'express'
import dotenv from "dotenv";
import responseError from './middleware/response-error';
import { controllersStartup } from './config/controllersStartup';

dotenv.config();
const port = process.env.PORT

const app = express()

app.use(express.json())

controllersStartup(app)

app.use(responseError)

app.listen(port, ()=> console.log('Server is running. \nPort: ', port))