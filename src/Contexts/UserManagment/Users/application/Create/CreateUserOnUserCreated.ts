import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSuscriber';
import { UserCreatedDomainEvent } from '../../domain/UserCreatedDomainEvent';
import { UserId } from '../../domain/UserId';
import { CreatorUserDomainEvent } from './CreatorUserDomainEvent';
import { UserUsername } from '../../domain/UserUsername';
import { UserFirstName } from '../../domain/UserFirstName';
import { UserLastName } from '../../domain/UserLastName';

export class CreateUserOnUserCreated implements DomainEventSubscriber<UserCreatedDomainEvent> {
  constructor(private creator: CreatorUserDomainEvent) {
    console.log('Entra aca');
  }

  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent];
  }

  async on(domainEvent: UserCreatedDomainEvent): Promise<void> {
    console.log('Evento de dominio capturado: ', domainEvent);
    await this.creator.run({
      id: new UserId(domainEvent.aggregateId),
      username: new UserUsername(domainEvent.username),
      firstName: new UserFirstName(domainEvent.firstName),
      lastName: new UserLastName(domainEvent.lastName),
    });
  }
}
