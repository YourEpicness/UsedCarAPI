import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UsersService } from "./users.service";
import { UserDto } from "./dtos/user.dto";
import { Serialize } from "../interceptors/serialize.interceptor";

@Serialize(UserDto)
@Controller("auth")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/signup")
  createUser(@Body() body: CreateUserDto): void {
    this.usersService.create(body.email, body.password);
  }

  @Get("/:id")
  async findUser(@Param("id") id: string) {
    // id is returned as string and we have to conver tit
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @Get("")
  findAllUsers(@Query("email") email: string) {
    return this.usersService.find(email);
  }

  @Delete("/:id")
  removeUser(@Param("id") id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
