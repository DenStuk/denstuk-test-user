import { getRepository } from "typeorm";
import { PasswordManager } from "../../../domain/authentication/services/PasswordManager";
import { HttpError } from "../../../domain/shared/errors/HttpError";
import { CreateUserDto } from "../../../domain/users/dtos/CreateUserDto";
import { User } from "../../../domain/users/entities/User";
import { CrudController } from "../shared/controllers/CrudController";
import { IRequestResult } from "../shared/interfaces/IRequestResult";

export class UsersController extends CrudController<User> {

    public constructor() { super(getRepository(User)); }

    public async create(createDto: CreateUserDto): Promise<IRequestResult> {
        try {
            const hashedPassword = await PasswordManager.toHash(createDto.password);
            const user = await this._repository.create({ ...createDto, password: hashedPassword });
            
            this._repository.save(user);
            return this.serializeResult(201);
        } catch (err) { throw new HttpError(err.statusCode, err.message); }
    }

}