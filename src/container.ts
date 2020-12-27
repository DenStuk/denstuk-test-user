import { Container } from "inversify";
import { Application, IApplication } from "./application/http/app";
import { HttpRouter, IHttpRouter } from "./application/http/HttpRouter";
import { TYPES } from "./types";

const container = new Container();

container.bind<IHttpRouter>(TYPES.IHttpRouter).to(HttpRouter);
container.bind<IApplication>(TYPES.IApplication).to(Application);

export { container };