import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
} from "typeorm";
import { Exclude } from "class-transformer";

// Step 1: Create an entity that represents the data types
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  // Hooks: Only executed on entity instance (create) NOT directly passing {}
  @AfterInsert()
  logInsert() {
    console.log("Inserted User with id", this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log("Removed User with id", this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log("Updated User with id", this.id);
  }
}
