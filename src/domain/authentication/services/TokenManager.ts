import jwt from "jsonwebtoken";
import { User } from "../../users/entities/User";

export class TokenManager {

    public static sign(username: string): string {
        return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET!, {
            expiresIn: "2d"
        });
    }

    public static verify(token: string): any {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    }

}