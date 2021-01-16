const { createLogger, format, transports } = require("winston");

const httpTransportOptions = {
  host: "http-intake.logs.datadoghq.com",
  path: `/v1/input/${process.env.DD_API_KEY}?ddsource=nodejs&service=cartApi`,
  ssl: true,
};

export const logConfigDev = {
  level: "info",
  exitOnError: false,
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.prettyPrint()
  ),
  transports: [new transports.Console()],
};

export const logConfigProduction = {
  level: "info",
  exitOnError: false,
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [new transports.Http(httpTransportOptions)],
};



let logger;
if (process.env.NODE_ENV === "production") {
  logger = createLogger(logConfigProduction);
} else {
  logger = createLogger(logConfigDev);
}

export default logger;
