import { EventBus } from '../../../../Shared/domain/EventBus';
import { EventId } from '../../../Events/domain/EventId';
import { Lot } from '../../domain/Lot';
import { LotId } from '../../domain/LotId';
import { LotName } from '../../domain/LotName';
import { LotPrice } from '../../domain/LotPrice';
import { LotRepository } from '../../domain/LotRepository';
import { LotTotalTicket } from '../../domain/LotTotalTicket';

export class LotCreator {
  constructor(
    private readonly lotRepository: LotRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(params: { id: LotId; name: LotName; totalTicket: LotTotalTicket; price: LotPrice; idEvent: EventId }): Promise<void> {
    const lot = Lot.create(params.id, params.name, params.totalTicket, params.price, params.idEvent);

    await this.lotRepository.save(lot);

    await this.eventBus.publish(lot.pullDomainEvents());
  }
}
