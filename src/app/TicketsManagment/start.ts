import { TicketsManagmentApp } from './TicketsManagmentApp';

try {
  new TicketsManagmentApp().start();
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
  process.exit(1);
});
