import { IsBoolean, IsDefined, IsString, Length, Max } from "class-validator";

export class CreateUserDto {

    @IsDefined()
    @IsString()
    @Length(1, 150)
    username: string;

    @IsString()
    @Max(30)
    first_name: string;

    @IsString()
    @Max(150)
    last_name: string;

    @IsDefined()
    @IsString()
    @Length(1, 128)
    password: string;

    @IsDefined()
    @IsBoolean()
    is_active: boolean;
    
}