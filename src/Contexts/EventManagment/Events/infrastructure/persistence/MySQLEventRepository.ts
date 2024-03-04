import { EntitySchema } from 'typeorm';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { EventEntity } from './typeorm/EventEntity';
import { Event } from '../../domain/Event';
import { EventRepository } from '../../domain/EventRepository';

export class MySQLEventRepository extends TypeOrmRepository<Event> implements EventRepository {
  protected entitySchema(): EntitySchema<Event> {
    return EventEntity;
  }

  async save(event: Event): Promise<void> {
    await this.persist(event);
  }
}
