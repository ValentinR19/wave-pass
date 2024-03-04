import { EventBus } from '../../Contexts/Shared/domain/EventBus';
import { DomainEventSubscribers } from '../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { RabbitMqConnection } from '../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import container from './dependency-injection';
import { Server } from './server';

export class EventManagmentApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5003';
    this.server = new Server(port);

    await this.configureEventBus();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    const rabbitMQConnection = container.get<RabbitMqConnection>('EventManagment.Shared.RabbitMQConnection');
    await rabbitMQConnection.close();
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>('EventManagment.Shared.domain.EventBus');
    const rabbitMQConnection = container.get<RabbitMqConnection>('EventManagment.Shared.RabbitMQConnection');
    await rabbitMQConnection.connect();

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }
}
