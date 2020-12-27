import { Repository, getRepository } from "typeorm";
import dayjs from "dayjs";
import { User } from "../entities/User";

export class UserService {

    private readonly _repo: Repository<User> = getRepository(User);

    public async updateLastLogin(id: string): Promise<void> {
        try { await this._repo.update({ id }, { last_login: dayjs().format() }); } 
        catch (err) { throw new Error(err.message); }
    }

}