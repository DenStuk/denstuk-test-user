process.env.NODE_ENV = "test";

import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { createConnection, ConnectionOptions, Connection } from "typeorm";
import { createServer, Server as HttpServer } from "http";
import express from "express";
import Application from "../src/application/http/app";
import { container } from "../src/container";
import { TYPES } from "../src/types";
import supertest from "supertest";

jest.setTimeout(10000)

export class TestFactory {
    private _app: express.Application;
    private _connection: Connection;
    private _server: HttpServer;

    private options: ConnectionOptions = {
        type: "sqljs",
        database: new Uint8Array(),
        location: "database",
        logging: false,
        synchronize: true,
        entities: ["src/domain/**/*.ts"]
    };

    public get app(): supertest.SuperTest<supertest.Test> {
        return supertest(this._app);
    }

    public get connection(): Connection {
        return this._connection;
    }

    public get server(): HttpServer {
        return this._server;
    }

    public async init(): Promise<void> {
        this._connection = await createConnection(this.options);
        const application: Application = container.get<Application>(TYPES.IApplication);
        application.initialize();
        this._app = application.app;
        this._server = createServer(this._app).listen(5439);
    }

    public async close(): Promise<void> {
        this._server.close();
        this._connection.close();
    }
}
