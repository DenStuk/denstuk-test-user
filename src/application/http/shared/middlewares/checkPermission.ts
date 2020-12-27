import { Request, Response, NextFunction } from "express";
import { HttpError } from "../../../../domain/shared/errors/HttpError";

export const checkPermission = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user?.is_superuser) { throw new HttpError(403, "Permission denied"); }
        next();
    }
}