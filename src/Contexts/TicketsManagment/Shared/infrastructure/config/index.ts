import convict from 'convict';
const userManagmentConfig = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_env',
  },
  typeorm: {
    host: {
      doc: 'The database host',
      format: String,
      env: 'TYPEORM_HOST',
      default: 'localhost',
    },
    port: {
      doc: 'The database port',
      format: Number,
      env: 'TYPEORM_PORT',
      default: '3306',
    },
    username: {
      doc: 'The database username',
      format: String,
      env: 'TYPEORM_USERNAME',
      default: 'root',
    },
    password: {
      doc: 'The database password',
      format: String,
      env: 'TYPEORM_PASSWORD',
      default: 'root',
    },
    database: {
      doc: 'The database name',
      format: String,
      env: 'TYPEORM_DATABASE',
      default: 'tickets-managent-dev',
    },
  },
  rabbitmq: {
    connectionSettings: {
      username: {
        doc: 'RabbitMQ username',
        format: String,
        env: 'RABBITMQ_USERNAME',
        default: 'root',
      },
      password: {
        doc: 'RabbitMQ password',
        format: String,
        env: 'RABBITMQ_PASSWORD',
        default: 'root',
      },
      vhost: {
        doc: 'RabbitMQ virtual host',
        format: String,
        env: 'RABBITMQ_VHOST',
        default: '/',
      },
      connection: {
        secure: {
          doc: 'RabbitMQ secure protocol',
          format: Boolean,
          env: 'RABBITMQ_SECURE',
          default: false,
        },
        hostname: {
          doc: 'RabbitMQ hostname',
          format: String,
          env: 'RABBITMQ_HOSTNAME',
          default: 'localhost',
        },
        port: {
          doc: 'RabbitMQ amqp port',
          format: Number,
          env: 'RABBITMQ_PORT',
          default: 5672,
        },
      },
    },
    exchangeSettings: {
      name: {
        doc: 'RabbitMQ exchange name',
        format: String,
        env: 'RABBITMQ_EXCHANGE_NAME',
        default: 'domain_events',
      },
    },
    maxRetries: {
      doc: 'Max number of retries for each message',
      format: Number,
      env: 'RABBITMQ_MAX_RETRIES',
      default: 3,
    },
    retryTtl: {
      doc: 'Ttl for messages in the retry queue',
      format: Number,
      env: 'RABBITMQ_RETRY_TTL',
      default: 1000,
    },
  },
});

userManagmentConfig.loadFile([__dirname + '/default.json', __dirname + '/' + userManagmentConfig.get('env') + '.json']);

export default userManagmentConfig;
