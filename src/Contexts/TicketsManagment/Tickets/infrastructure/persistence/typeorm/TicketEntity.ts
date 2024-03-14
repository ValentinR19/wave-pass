import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { Ticket } from '../../../domain/Ticket';
import { TicketName } from '../../../domain/TicketName';
import { TicketId } from '../../../domain/TicketId';

export const TicketEntity = new EntitySchema<Ticket>({
  name: 'Ticket',
  tableName: 'tickets',
  target: Ticket,
  columns: {
    id: {
      name: 'id',
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(TicketId),
    },
    name: {
      name: 'name',
      type: String,
      transformer: ValueObjectTransformer(TicketName),
    },
  },
});
