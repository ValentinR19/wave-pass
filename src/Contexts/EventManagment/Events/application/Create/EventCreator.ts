import { EventBus } from '../../../../Shared/domain/EventBus';
import { Event } from '../../domain/Event';
import { EventId } from '../../domain/EventId';
import { EventTitle } from '../../domain/EventTitle';
import { EventRepository } from '../../domain/EventRepository';

export class EventCreator {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(params: { id: EventId; title: EventTitle }): Promise<void> {
    const event = Event.create(params.id, params.title);

    await this.eventRepository.save(event);

    await this.eventBus.publish(event.pullDomainEvents());
  }
}
