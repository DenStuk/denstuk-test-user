import { IsDefined, IsString, Length, Min } from "class-validator";

export class UserLoginDto {

    @IsDefined()
    @IsString()
    @Length(1)
    username: string;

    @IsDefined()
    @IsString()
    @Length(1)
    password: string;

}