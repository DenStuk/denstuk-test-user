import { TokenManager } from "../../src/domain/authentication/services/TokenManager";
import { User } from "../../src/domain/users/entities/User";

export const getToken = (user: User) => {
    const token: string = TokenManager.sign(user.username);
    return token;
}