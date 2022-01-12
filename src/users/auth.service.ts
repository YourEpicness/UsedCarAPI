import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";

// scrypt only uses callbacks, so we use promisify to use modern promise syntax
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException("Email is already in use");
    }

    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString("hex");

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hased result and the salt together
    const result = salt + "." + hash.toString("hex");

    // Create a new user and save it
    const user = await this.usersService.create(email, result);

    // Return the user
    return user;
  }

  signin() {}
}
