import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import swaggerUi from "swagger-ui-express";
import expressWinston from "express-winston";

import cartRouter from "./routers/cartRouter";
import { NotFoundError } from "./config/errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import apolloServer from "./config/graphql";
import swaggerDocument from "./swagger.json";
import { logConfigDev, logConfigProduction } from "./config/logger";

const app: Application = express();
const router = express.Router();
app.use(bodyParser.json());


if (process.env.NODE_ENV === "production") {
    app.use(expressWinston.logger(logConfigProduction));
} else if (process.env.NODE_ENV !== "test"){
    app.use(expressWinston.logger(logConfigDev));
}


app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

apolloServer.applyMiddleware({ app });
app.use(cartRouter(router));
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
