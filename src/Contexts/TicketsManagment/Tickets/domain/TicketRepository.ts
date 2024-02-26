import { Ticket } from './Ticket';

export interface TicketRepository {
  save(ticket: Ticket): Promise<void>;
}
