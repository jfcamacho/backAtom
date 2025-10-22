import express from "express";
import cors from "cors";

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import router from "./routes/index.route";

const app = express()

app.use(cors({origin: true}))
app.use(express.json())

app.use("/api", router)

logger.log("App initialized")

export const api = onRequest(
    {region: 'us-central1'},
    app
)
