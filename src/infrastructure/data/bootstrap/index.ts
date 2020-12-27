import { User } from "../../../domain/users/entities/User";
import { getRepository } from "typeorm";
import { PasswordManager } from "../../../domain/authentication/services/PasswordManager";

export const bootstrap = async (): Promise<void> => {
    const testUser = await getRepository(User).create({
        username: "DenStuk",
        first_name: "Denis",
        last_name: "Stuk",
        password: await PasswordManager.toHash("password"),
        is_active: true,
        is_superuser: true
    });
    
    await getRepository(User).save(testUser);
}