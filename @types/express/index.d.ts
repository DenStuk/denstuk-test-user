import { Request } from "express";
import { User } from "../../src/domain/users/entities/User";

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}