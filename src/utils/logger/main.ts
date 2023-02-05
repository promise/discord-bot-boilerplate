import { createFileTransports, globalFormat } from "./";
import { createLogger, transports } from "winston";

export const mainLogger = createLogger({
  format: globalFormat,
  transports: [
    ...createFileTransports("main", ["info"]),
    new transports.Console({ level: "info" }),
  ],
});
