import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

describe("AuthService", () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service to fix DI issue
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    // Create an instance of auth service
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it("can create an instance of auth service", async () => {
    expect(service).toBeDefined();
  });

  it("creates a new user with a salted and hashed password", async () => {
    const user = await service.signup("asdf@asdf.com", "sadf");

    expect(user.password).not.toEqual("asdf");
    const [salt, hash] = user.password.split(".");
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it("throws an error if user signs up with email that is in use", async () => {
    // First sign up a user
    await service.signup("test@test.com", "asd");

    // Then test to see if user already exists
    await expect(
      service.signup("test@test.com", "sadf")
    ).rejects.toBeInstanceOf(BadRequestException);

    await expect(service.signup("test@test.com", "sadf")).rejects.toMatchObject(
      {
        message: "Email is already in use",
      }
    );
  });

  it("throws if signin is called with an unused email", async () => {
    expect.assertions(3);

    await expect(
      service.signin("test@test.com", "asfasffsa")
    ).rejects.toBeInstanceOf(NotFoundException);

    await expect(
      service.signin("test@test.com", "asfasffsa")
    ).rejects.toHaveProperty("message", "User not found");

    await expect(
      service.signin("test@test.com", "asfasffsa")
    ).rejects.toMatchObject({ message: "User not found" });
  });

  it("throws if an invalid password is provided", async () => {
    await service.signup("tester5@test.com", "realpassword");

    await expect(
      service.signin("tester5@test.com", "123456")
    ).rejects.toBeInstanceOf(BadRequestException);

    await expect(
      service.signin("tester5@test.com", "123456")
    ).rejects.toMatchObject({ message: "Bad password" });
  });

  it("returns a user if correct password is provided", async () => {
    await service.signup("asdf@sadf.com", "mypassword");
    const user = await service.signin("asdf@sadf.com", "mypassword");

    console.log(user);
    expect(user).toBeDefined();
  });
});
