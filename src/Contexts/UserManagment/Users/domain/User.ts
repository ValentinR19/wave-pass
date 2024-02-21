import { AggregateRoot } from "../../../Shared/domain/AgregateRoot";
import { UserFirstName } from "./UserFirstName";
import { UserId } from "./UserId";
import { UserLastName } from "./UserLastName";
import { UserUsername } from "./UserUsername";

export class User extends AggregateRoot {
  id: UserId;
  username: UserUsername;
  firstName: UserFirstName;
  lastName: UserLastName;

  constructor(id: UserId, username: UserUsername, firstname: UserFirstName, lastname: UserLastName) {
    super();
    this.id = id;
    this.username = username;
    this.firstName = firstname;
    this.lastName = lastname;
  }

  static create(id: UserId, username: UserUsername, firstName: UserFirstName, lastName: UserLastName): User {
    return new User(id, username, firstName, lastName);
  }

  static fromPrimitives(plainData: { id: string; username: string; firstname: string; lastname: string }): User {
    return new User(new UserId(plainData.id), new UserUsername(plainData.username), new UserFirstName(plainData.firstname), new UserLastName(plainData.lastname));
  }

  toPrimitives() {
    return {
      id: this.id.value,
      username: this.username.value,
      firstname: this.firstName.value,
      lastname: this.lastName.value,
    };
  }
}
