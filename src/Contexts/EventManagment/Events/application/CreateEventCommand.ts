import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  title: string;
};

export class CreateEventCommand extends Command {
  id: string;
  title: string;

  constructor({ id, title }: Params) {
    super();
    this.id = id;
    this.title = title;
  }
}
