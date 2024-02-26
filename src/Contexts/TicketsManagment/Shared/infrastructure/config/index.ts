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
});

userManagmentConfig.loadFile([__dirname + '/default.json', __dirname + '/' + userManagmentConfig.get('env') + '.json']);

export default userManagmentConfig;
