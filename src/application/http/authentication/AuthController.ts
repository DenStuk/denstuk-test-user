import { getRepository } from "typeorm";
import { UserLoginDto } from "../../../domain/authentication/dtos/UserLoginDto";
import { PasswordManager } from "../../../domain/authentication/services/PasswordManager";
import { TokenManager } from "../../../domain/authentication/services/TokenManager";
import { HttpError } from "../../../domain/shared/errors/HttpError";
import { NotFoundError } from "../../../domain/shared/errors/NotFoundError";
import { User } from "../../../domain/users/entities/User";
import { UserService } from "../../../domain/users/services/UserService";
import { BaseController } from "../shared/controllers/BaseController";
import { IRequestResult } from "../shared/interfaces/IRequestResult";

export class AuthController extends BaseController {

    public async login(loginDto: UserLoginDto): Promise<IRequestResult> {
        try {
            const user = await getRepository(User).findOne({ username: loginDto.username });
            if (!user) { throw new NotFoundError(`user with username '${loginDto.username}' not found`); }

            if (!await PasswordManager.compare(user.password, loginDto.password)) {
                throw new HttpError(400, "invalid password");
            }

            const userService = new UserService();
            await userService.updateLastLogin(user.id);

            const token: string = TokenManager.sign(user.username);

            return this.serializeResult(200, { token });
        } catch (err) { throw new HttpError(err.statusCode, err.message); }
    }

}