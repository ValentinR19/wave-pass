import { DomainEventSubscribers } from '../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { RabbitMQConfigurer } from '../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer';
import { RabbitMqConnection } from '../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { RabbitMQConfig } from '../../../Contexts/UserManagment/Shared/infrastructure/RabbitMQ/RabbitMQConfigFactory';
import container from '../dependency-injection';

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMqConnection>('UserManagment.Shared.RabbitMQConnection');
    const { name: exchange } = container.get<RabbitMQConfig>('UserManagment.Shared.RabbitMQConfig').exchangeSettings;
    await connection.connect();

    const configurer = container.get<RabbitMQConfigurer>('UserManagment.Shared.RabbitMQConfigurer');
    const subscribers = DomainEventSubscribers.from(container).items;

    await configurer.configure({ exchange, subscribers });
    await connection.close();
  }
}
