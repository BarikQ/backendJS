import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, prettyPrint } = format;

export const logger = createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
  ],
});