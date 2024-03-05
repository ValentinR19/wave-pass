import { RabbitMQConfig } from '../../../Contexts/EventManagment/Shared/infrastructure/RabbitMQ/RabbitMQConfigFactory';
import { DomainEventSubscribers } from '../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { RabbitMQConfigurer } from '../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer';
import { RabbitMQqueueFormatter } from '../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter';
import { RabbitMqConnection } from '../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import container from '../dependency-injection';

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMqConnection>('EventManagment.Shared.RabbitMQConnection');
    const nameFormatter = container.get<RabbitMQqueueFormatter>('EventManagment.Shared.RabbitMQQueueFormatter');
    const { exchangeSettings, retryTtl } = container.get<RabbitMQConfig>('EventManagment.Shared.RabbitMQConfig');

    await connection.connect();

    const configurer = new RabbitMQConfigurer(connection, nameFormatter, retryTtl);
    const subscribers = DomainEventSubscribers.from(container).items;

    await configurer.configure({ exchange: exchangeSettings.name, subscribers });
    await connection.close();
  }
}
