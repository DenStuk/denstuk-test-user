import { getRepository } from "typeorm";
import { PasswordManager } from "../../src/domain/authentication/services/PasswordManager";
import { User } from "../../src/domain/users/entities/User";

export const createUser = async (username?: string, password?: string, isSuperUser?: boolean) => {
    const hashedPassword = await PasswordManager.toHash(password || "password");
    const user = await getRepository(User).create({ 
        username: username || "test",
        is_active: true,
        password: hashedPassword,
        is_superuser: isSuperUser || false
    });
    await getRepository(User).save(user);
    return user;
}