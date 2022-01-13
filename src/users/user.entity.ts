import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Report } from "src/reports/report.entity";

// Step 1: Create an entity that represents the data types
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // First arg: used to solve circular dependency issue
  // Second arg: Takes an instance of entity you are relating back to current
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
