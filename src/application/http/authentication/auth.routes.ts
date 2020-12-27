import express, { Request, Response } from "express";
import { UserLoginDto } from "../../../domain/authentication/dtos/UserLoginDto";
import { checkRequestBody } from "../shared/middlewares/checkRequestBody";
import { AuthController } from "./AuthController";

const router = express.Router();

router.post(
    "/api-token-auth", 
    checkRequestBody(UserLoginDto),
    async (req: Request, res: Response) => {
        const authController = new AuthController();
        const reqResult = await authController.login(req.body);
        return res.status(reqResult.statusCode).send(reqResult.data);
});

export { router as authRouter };