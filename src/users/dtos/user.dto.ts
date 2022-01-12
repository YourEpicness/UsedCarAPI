import { Expose } from "class-transformer";

export class UserDto {
  // Shares the property
  @Expose()
  id: number;

  @Expose()
  email: string;
}
