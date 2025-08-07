import { User } from "../models/User";

export class UserBuilder {
  private user: User;

  constructor() {
    this.user = {
      id: 0,
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      userStatus: 0,
    };
  }

  withId(id: number): this {
    this.user.id = id;
    return this;
  }

  withUsername(username: string): this {
    this.user.username = username;
    return this;
  }

  withFirstName(firstName: string): this {
    this.user.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): this {
    this.user.lastName = lastName;
    return this;
  }

  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  withPassword(password: string): this {
    this.user.password = password;
    return this;
  }

  withPhone(phone: string): this {
    this.user.phone = phone;
    return this;
  }

  withUserStatus(userStatus: number): this {
    this.user.userStatus = userStatus;
    return this;
  }

  build(): User {
    return { ...this.user };
  }
}
