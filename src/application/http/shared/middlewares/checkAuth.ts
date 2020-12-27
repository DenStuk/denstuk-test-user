import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { TokenManager } from "../../../../domain/authentication/services/TokenManager";
import { HttpError } from "../../../../domain/shared/errors/HttpError";
import { NotFoundError } from "../../../../domain/shared/errors/NotFoundError";
import { User } from "../../../../domain/users/entities/User";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) { throw new HttpError(401, "Unauthorized"); }

    const token = req.headers.authorization.split(" ")[1] || null;
    if (!token) { throw new HttpError(401, "Unauthorized"); }

    let payload: any;
    try { payload = TokenManager.verify(token); } 
    catch (err) { throw new HttpError(401, err.message) }
    
    const user = await getRepository(User).findOne({ username: payload.username });
    if (!user) { throw new NotFoundError("user not found"); }

    req.user = user;

    next();
};
