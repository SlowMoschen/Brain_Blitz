import * as winston from 'winston';
import * as morgan from 'morgan';
import { StreamOptions } from 'morgan';

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'blue',
	debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
	winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
	winston.format.colorize({ all: true }),
	winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transports = [
	new winston.transports.Console(),
	new winston.transports.File({
		filename: 'logs/error.log',
		level: 'error',
	}),
	new winston.transports.File({ filename: 'logs/all.log' }),
];

const Logger = winston.createLogger({
	level: 'http',
	levels,
	format,
	transports,
});

const stream: StreamOptions = {
	write: (message) => Logger.http(message),
};

const loggerMiddleware = morgan(
	` 
      Method: :method 
      Endpoint: :url 
      Statuscode: :status 
      Response Content-Lenght: :res[content-length] 
      Respone-Time: :response-time ms`,
	{ stream },
);
export default loggerMiddleware;
