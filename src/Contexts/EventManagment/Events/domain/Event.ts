import { AggregateRoot } from '../../../Shared/domain/AgregateRoot';
import { Lot } from '../../Lots/domain/Lot';
import { UserId } from '../../Shared/domain/UserId';
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

  lots: Lot[];

  constructor(id: EventId, title: EventTitle, eventDate: EventDate, description: EventDescription, totalTickets: EventTotalTicket, dateStartBuy: EventDate, dateEndBuy: EventDate) {
    super();
    this.id = id;
    this.title = title;
    this.eventDate = eventDate;
    this.description = description;
    this.totalTickets = totalTickets;
    this.dateStartBuy = dateStartBuy;
    this.dateEndBuy = dateEndBuy;
  }

  static create(
    id: EventId,
    title: EventTitle,
    eventDate: EventDate,
    description: EventDescription,
    totalTickets: EventTotalTicket,
    dateStartBuy: EventDate,
    dateEndBuy: EventDate,
  ): Event {
    const event = new Event(id, title, eventDate, description, totalTickets, dateStartBuy, dateEndBuy);
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

  static fromPrimitives(plainData: { id: string; title: string; eventDate: string; description: string; totalTickets: number; dateStartBuy: string; dateEndBuy: string }): Event {
    return new Event(
      new EventId(plainData.id),
      new EventTitle(plainData.title),
      new EventDate(plainData.eventDate),
      new EventDescription(plainData.description),
      new EventTotalTicket(plainData.totalTickets),
      new EventDate(plainData.dateStartBuy),
      new EventDate(plainData.dateEndBuy),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title.value,
      eventDate: this.eventDate.value,
      description: this.description.value,
      totalTickets: this.totalTickets.value,
      dateStartBuy: this.dateStartBuy.value,
      dateEndBuy: this.dateEndBuy.value,
      idUser: this.idUser.value,
    };
  }
}
