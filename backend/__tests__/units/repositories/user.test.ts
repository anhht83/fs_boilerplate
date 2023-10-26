import { faker } from "@faker-js/faker";
import { User } from "../../../src/models/user";

describe("User Repository", () => {
  let newUser: any;
  beforeEach(() => {
    newUser = {
      email: faker.internet.email().toLowerCase(),
      password: "password1"
    };
  });

  it("should create user", async () => {
    const user = await User.create(newUser);
    expect(user.email).toMatch(newUser.email);
  });
});
