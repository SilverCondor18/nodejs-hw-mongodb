import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import router from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";

export function setupServer() {
    const app = express();

    const PORT = getEnvVar("PORT", 3000);
    app.use(express.json({
        type: "application/json",
        limit: "100kb"
    }));
    app.use(cors());
    app.use(
        pino({
            transport: {
                target: "pino-pretty"
            }
        })
    );
    app.use(router);
    app.use(/(.*)/, notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}