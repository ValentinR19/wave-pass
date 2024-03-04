import { AggregateRoot } from '../../../Shared/domain/AgregateRoot';
import { UserId } from '../../Users/domain/UserId';
import { EventCreatedDomainEvent } from './EventCreatedDomainEvent';
import { EventDate } from './EventDate';
import { EventDescription } from './EventDescription';
import { EventId } from './EventId';
import { EventTitle } from './EventTitle';
import { EventTotalTicket } from './EventTotalTicket';

export class Event extends AggregateRoot {
  id: EventId;

  title: EventTitle;

  eventDate: EventDate;

  description: EventDescription;

  totalTickets: EventTotalTicket;

  dateStartBuy: EventDate;

  dateEndBuy: EventDate;

  createdAt: EventDate;

  updatedAt: EventDate | null;

  deletedAt: EventDate | null;

  idLocation: number;

  idUser: UserId;

  images: string[];

  constructor(id: EventId, title: EventTitle) {
    super();
    this.id = id;
    this.title = title;
  }

  static create(id: EventId, title: EventTitle): Event {
    const event = new Event(id, title);
    event.record(
      new EventCreatedDomainEvent({
        aggregateId: event.id.value,
        title: event.title.value,
        eventDate: event.eventDate.value,
        description: event.description.value,
        totalTickets: event.totalTickets.value,
        idUsuario: event.idUser.value,
        dateStartBuy: event.dateStartBuy.value,
        dateEndBuy: event.dateEndBuy.value,
      }),
    );

    return event;
  }

  static fromPrimitives(plainData: { id: string; name: string }): Event {
    return new Event(new EventId(plainData.id), new EventTitle(plainData.name));
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
