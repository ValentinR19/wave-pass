import { EventBus } from '../../../../Shared/domain/EventBus';
import { EventId } from '../../domain/EventId';
import { EventTitle } from '../../domain/EventTitle';
import { EventRepository } from '../../domain/EventRepository';
import { EventDate } from '../../domain/EventDate';
import { EventDescription } from '../../domain/EventDescription';
import { EventTotalTicket } from '../../domain/EventTotalTicket';
import { UserId } from '../../../Shared/domain/UserId';
import { Event } from '../../domain/Event';

export class EventCreator {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(params: {
    id: EventId;
    title: EventTitle;
    eventDate: EventDate;
    description: EventDescription;
    totalTickets: EventTotalTicket;
    dateStartBuy: EventDate;
    dateEndBuy: EventDate;
    idLocation: string;
    idUser: UserId;
  }): Promise<void> {
    const event = Event.create(params.id, params.title, params.eventDate, params.description, params.totalTickets, params.dateStartBuy, params.dateEndBuy);

    await this.eventRepository.save(event);

    await this.eventBus.publish(event.pullDomainEvents());
  }
}
