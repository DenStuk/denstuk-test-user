import { Request, Response, NextFunction } from "express";
import { getLogger } from "log4js";
import { HttpError } from "../../../../domain/shared/errors/HttpError";

const logger = getLogger();

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "production") logger.error(err.message);
    
    if (err instanceof HttpError) {
        err.statusCode = err.statusCode || 500;
        return res.status(err.statusCode).send({ status: "ERROR", statusCode: err.statusCode, message: err.message });
    }
    
    res.status(500).send({ status: "ERROR", statusCode: 500, message: "Internal error" });
}