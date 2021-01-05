import {errorHandler} from './middlewares/error-handler';
import {NotFoundError} from './configurations/errors/not-found-error';
import cartRouter from "./routers/cartRouter";
import 'express-async-errors';
import mongoDb from "./configurations/databases/mongoDb";
import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import path from "path";

const startApp = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    const result = await mongoDb.connect();
    const app = express();
    const router = express.Router();
    if (result === null) {
        throw new Error("App failed to start")
    }

    app.use(bodyParser.json());
    
    app.get("/", async (req: Request, res: Response) => {
        res.sendFile(path.join(process.cwd(), "/assets/", "index.html"));
    });

    app.use(cartRouter(router));

    app.all('*', async (req, res) => {
        throw new NotFoundError();
    });

    app.use(errorHandler);
    app.listen(8000, () => console.log("App listening on 8000 port"));
}

startApp().catch((err) => {
    console.log("App failed to start")
});
