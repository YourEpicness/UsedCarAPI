import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // Service functions will talk to repository which executes function
  create(email: string, password: string) {
    // Creates a user entity in the user.entity file
    // USeful for validation
    const user = this.repo.create({ email, password }); // CAN USE HOOKS

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  // Returns an array with criteria met
  // Returns empty array if not found
  find(email: string) {
    return this.repo.find({ email });
  }

  // Partial<w/e> can use part of any type
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return this.repo.remove(user);
  }
}
