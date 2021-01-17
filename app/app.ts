import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import path from "path";
import expressWinston from "express-winston";

import cartRouter from "./routers/cartRouter";
import { NotFoundError } from "./configurations/errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import apolloServer from "./configurations/graphql";
import swaggerDocument1 from "./swaggerFile/swagger.json";
import { logConfigDev, logConfigProduction } from "./configurations/logger";

const app: Application = express();
const router = express.Router();
app.use(bodyParser.json());


if (process.env.NODE_ENV === "production") {
    app.use(expressWinston.logger(logConfigProduction));
} else if (process.env.NODE_ENV !== "test"){
    app.use(expressWinston.logger(logConfigDev));
}

app.get("/", async (req: Request, res: Response) => {
    console.log(__dirname);
    res.sendFile(path.join(process.cwd(), "/assets/", "index.html"));
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument1));

apolloServer.applyMiddleware({ app });
app.use(cartRouter(router));
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
