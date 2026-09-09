import express, { urlencoded } from "express";
import cors from "cors";
import http from "http";
import { scheduler } from "./cron.js";

const app = express()

scheduler();

app.use(cors())
app.use(express.json());
app.use(urlencoded({extended:true}))

const server = http.createServer(app)

export default app