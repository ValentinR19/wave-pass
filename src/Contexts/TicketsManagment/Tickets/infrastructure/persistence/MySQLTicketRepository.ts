import { EntitySchema } from 'typeorm';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { TicketEntity } from './typeorm/TicketEntity';
import { Ticket } from '../../domain/Ticket';
import { TicketRepository } from '../../domain/TicketRepository';

export class MySQLTicketRepository extends TypeOrmRepository<Ticket> implements TicketRepository {
  protected entitySchema(): EntitySchema<Ticket> {
    return TicketEntity;
  }

  async save(ticket: Ticket): Promise<void> {
    await this.persist(ticket);
  }
}
