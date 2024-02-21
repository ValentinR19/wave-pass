import { EventBus } from '../../Contexts/Shared/domain/EventBus';
import { DomainEventSubscribers } from '../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import container from './dependency-injection';
import { Server } from './server';
// import { RabbitMqConnection } from "../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection";

export class UserManagmentApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5001';
    this.server = new Server(port);

    // await this.configureEventBus();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    // const rabbitMQConnection = container.get<RabbitMqConnection>("Mooc.Shared.RabbitMQConnection");
    // await rabbitMQConnection.close();
    return this.server?.stop();
  }

  // private async configureEventBus() {
  //   const eventBus = container.get<EventBus>("UserManagment.Shared.domain.EventBus");
  //   // const rabbitMQConnection = container.get<RabbitMqConnection>("Mooc.Shared.RabbitMQConnection");
  //   // await rabbitMQConnection.connect();

  //   eventBus.addSubscribers(DomainEventSubscribers.from(container));
  // }
}
