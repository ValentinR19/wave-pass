import { Command } from "../../../Shared/domain/Command";

type Params = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
};

export class CreateUserCommand extends Command {
  id: string;
  username: string;
  firstName: string;
  lastName: string;

  constructor({ id, username, firstName, lastName }: Params) {
    super();
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
