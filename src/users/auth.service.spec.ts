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
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
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
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: "test@test.com", password: "afasfasf" } as User,
      ]);

    expect.assertions(2);

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
});
