// import { EventBus } from "../../../../Shared/domain/EventBus";
import { User } from '../../domain/User';
import { UserFirstName } from '../../domain/UserFirstName';
import { UserId } from '../../domain/UserId';
import { UserLastName } from '../../domain/UserLastName';
import { UserRepository } from '../../domain/UserRepository';
import { UserUsername } from '../../domain/UserUsername';

export class CreatorUserDomainEvent {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly eventBus: EventBus,
  ) {}

  async run(params: { id: UserId; username: UserUsername; firstName: UserFirstName; lastName: UserLastName }): Promise<void> {
    const user = User.create(params.id, params.username, params.firstName, params.lastName);

    await this.userRepository.save(user);
    // await this.eventBus.publish(user.pullDomainEvents());
  }
}
