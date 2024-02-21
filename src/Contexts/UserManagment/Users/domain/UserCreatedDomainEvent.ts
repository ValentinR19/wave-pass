import { DomainEvent } from "../../../Shared/domain/DomainEvent";

type CreateUserDomainEventAttributes = {
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
};

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "user.created";

  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor({
    aggregateId,
    username,
    firstName,
    lastName,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    username: string;
    firstName: string;
    lastName: string;
    occurredOn?: Date;
  }) {
    super({ eventName: UserCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  toPrimitives(): CreateUserDomainEventAttributes {
    const { username, firstName, lastName } = this;
    return {
      username,
      firstName,
      lastName,
    };
  }

  static fromPrimitives(params: { aggregateId: string; attributes: CreateUserDomainEventAttributes; eventId: string; occurredOn: Date }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserCreatedDomainEvent({
      aggregateId,
      username: attributes.username,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      eventId,
      occurredOn,
    });
  }
}
