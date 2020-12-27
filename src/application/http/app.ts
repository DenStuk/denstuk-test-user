import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import "express-async-errors";
import { inject, injectable } from "inversify";
import { HttpRouter } from "./HttpRouter";
import { errorHandler } from "./shared/middlewares/errorHandler";
import morgan from "morgan";
import { TYPES } from "../../types";
import { HttpError } from "../../domain/shared/errors/HttpError";
import { authRouter } from "./authentication/auth.routes";

export interface IApplication {
    initialize(): void;
}

@injectable()
export class Application {

    private readonly _app: express.Application;
    @inject(TYPES.IHttpRouter) private readonly _httpRouter: HttpRouter;

    public constructor() {
        this._app = express();
        this._app.set("trust proxy", true);
        this._app.use(express.json({ limit: "50mb" }));
        this._app.use(express.urlencoded({ extended: true }));
        this._app.use(compression());
        this._app.use(cors());
        this._app.use(helmet({ contentSecurityPolicy: false }));
        this._app.use(morgan("combined"));
    }

    public initialize(): void {
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this._app.use(authRouter);
        this._app.use("/api/v1", this._httpRouter.get());
        this._app.all("*", async (req: Request, res: Response) => { throw new HttpError(404, "Route not found"); });
        this._app.use(errorHandler);
    }

    get app() { return this._app }

}

export default Application;