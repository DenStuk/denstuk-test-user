import express, { Request, Response } from "express";
import { CreateUserDto } from "../../../domain/users/dtos/CreateUserDto";
import { PartialUpdateUserDto } from "../../../domain/users/dtos/PartialUpdateDto";
import { UpdateUserDto } from "../../../domain/users/dtos/UpdateUserDto";
import { checkAuth } from "../shared/middlewares/checkAuth";
import { checkPermission } from "../shared/middlewares/checkPermission";
import { checkRequestBody } from "../shared/middlewares/checkRequestBody";
import { UsersController } from "./UsersController";

const router = express.Router();

router.get(
    "/", 
    checkAuth, 
    async (req: Request, res: Response) => {
        const usersController = new UsersController();
        const result = await usersController.find();
        res.status(result.statusCode).send(result.data);
});

router.post(
    "/", 
    checkAuth, 
    checkPermission(),
    checkRequestBody(CreateUserDto),
    async (req: Request, res: Response) => {
        const usersController = new UsersController();
        const result = await usersController.create(req.body);
        return res.status(result.statusCode).send();
});

router.get(
    "/:id", 
    checkAuth, 
    async (req: Request, res: Response) => {
        const usersController = new UsersController();
        const result = await usersController.findOne(req.params.id);
        return res.status(result.statusCode).send(result.data);
});

router.put(
    "/:id",
    checkAuth, 
    checkPermission(),
    checkRequestBody(UpdateUserDto),
    async (req: Request, res: Response) => {
        const usersController = new UsersController();
        const result = await usersController.updateById(req.body, req.params.id);
        return res.status(result.statusCode).send();
});

router.patch(
    "/:id",
    checkAuth, 
    checkPermission(),
    checkRequestBody(PartialUpdateUserDto),
    async (req: Request, res: Response) => {
        const usersController = new UsersController();
        const result = await usersController.updateById(req.body, req.params.id);
        return res.status(result.statusCode).send();
});

router.delete(
    "/:id",
    checkAuth, 
    checkPermission(),
    async (req: Request, res: Response) => {
        const usersController = new UsersController();
        const result = await usersController.deleteById(req.params.id);
        return res.status(result.statusCode).send();
});

export { router as usersRouter };