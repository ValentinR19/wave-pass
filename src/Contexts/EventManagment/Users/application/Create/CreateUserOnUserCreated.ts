import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSuscriber';
import { UserCreatedDomainEvent } from '../../domain/UserCreatedDomainEvent';
import { UserId } from '../../../Shared/domain/UserId';
import { UserUsername } from '../../domain/UserUsername';
import { UserFirstName } from '../../domain/UserFirstName';
import { UserLastName } from '../../domain/UserLastName';
import { UserCreator } from './UserCreator';

export class CreateUserOnUserCreated implements DomainEventSubscriber<UserCreatedDomainEvent> {
  constructor(private creator: UserCreator) {}

  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent];
  }

  async on(domainEvent: UserCreatedDomainEvent): Promise<void> {
    await this.creator.run({
      id: new UserId(domainEvent.aggregateId),
      username: new UserUsername(domainEvent.username),
      firstName: new UserFirstName(domainEvent.firstName),
      lastName: new UserLastName(domainEvent.lastName),
    });
  }
}
