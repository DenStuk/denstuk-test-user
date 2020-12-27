import { IsBoolean, IsDefined, IsString, Length, Max } from "class-validator";

export class UpdateUserDto {

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

    @IsString()
    @Length(1, 128)
    @IsDefined()
    password: string;

    @IsDefined()
    @IsBoolean()
    is_active: boolean;
    
}