import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// Step 1: Create an entity that represents the data types
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
