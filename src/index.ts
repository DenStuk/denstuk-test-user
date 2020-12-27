import "reflect-metadata";
import dotenv from "dotenv";
import http from "http";
dotenv.config();

import { createConnection, getConnectionOptions } from "typeorm";
import Application from "./application/http/app";
import { container } from "./container";
import { TYPES } from "./types";
import { bootstrap } from "./infrastructure/data/bootstrap";

class Program {

    public static async Main() {
        console.clear();
        console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

        const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
        await createConnection({ ...connectionOptions, name: "default" } as any);

        const application: Application = container.get<Application>(TYPES.IApplication);
        application.initialize();
        const server = http.createServer(application.app);

        await bootstrap();

        server.listen(process.env.PORT, () => {
            console.log(`http://${process.env.HOST}:${process.env.PORT}`);
            console.log("Heap: " + (process.memoryUsage().heapTotal / (1024 * 1024)).toFixed(2) + " MB");
            console.log("CPU Time: " + process.cpuUsage().user);
        });
    }

}

Program.Main();