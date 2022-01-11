import { IsEmail, IsString } from "class-validator";
// Requires class-validator and class-transformer packages
// Used to validate body
export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
