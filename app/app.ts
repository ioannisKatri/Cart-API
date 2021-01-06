import express, {Application, Request, Response} from "express";
import bodyParser from "body-parser";
import path from "path";
import cartRouter from "./routers/cartRouter";
import {NotFoundError} from "./configurations/errors/not-found-error";
import {errorHandler} from "./middlewares/error-handler";

const app: Application = express();
const router = express.Router();
app.use(bodyParser.json());

app.get("/", async (req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "/assets/", "index.html"));
});

app.use(cartRouter(router));

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;