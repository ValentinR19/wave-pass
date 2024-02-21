import { Command } from '../../domain/Command';
import { CommandHandler } from '../../domain/CommandHandler';
import { CommandNotRegisteredError } from '../../domain/CommandNotRegisteredError';

export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
  constructor(commandHandlers: Array<CommandHandler<Command>> = []) {
    console.log('Entra aca')
    super();

    commandHandlers.forEach((commandHandler) => {
      console.log('Entra aca')
      this.set(commandHandler.subscribedTo(), commandHandler);
    });
  }



  public get<T extends Command>(command: T): CommandHandler<T> {
    const commandHandler = command.constructor.name as Command;
    
    if (!commandHandler) {
      throw new CommandNotRegisteredError(command);
    }

    return commandHandler as CommandHandler<T>;
  }
}
