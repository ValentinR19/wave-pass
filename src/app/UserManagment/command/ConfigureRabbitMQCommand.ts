import { DomainEventSubscribers } from '../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { RabbitMQConfigurer } from '../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer';
import { RabbitMQqueueFormatter } from '../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter';
import { RabbitMqConnection } from '../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { RabbitMQConfig } from '../../../Contexts/UserManagment/Shared/infrastructure/RabbitMQ/RabbitMQConfigFactory';
import container from '../dependency-injection';

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMqConnection>('UserManagment.Shared.RabbitMQConnection');
    const nameFormatter = container.get<RabbitMQqueueFormatter>('UserManagment.Shared.RabbitMQQueueFormatter');
    const { exchangeSettings, retryTtl } = container.get<RabbitMQConfig>('UserManagment.Shared.RabbitMQConfig');

    await connection.connect();

    const configurer = new RabbitMQConfigurer(connection, nameFormatter, retryTtl);
    const subscribers = DomainEventSubscribers.from(container).items;

    await configurer.configure({ exchange: exchangeSettings.name, subscribers });
    await connection.close();
  }
}
