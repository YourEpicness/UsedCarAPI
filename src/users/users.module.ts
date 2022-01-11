import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], // Step 2: Import entity
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
