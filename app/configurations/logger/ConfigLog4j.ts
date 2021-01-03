import {LogLevel, LoggerFactoryOptions, LogGroupRule, LFService, LoggerFactory} from 'typescript-logging';

const options = new LoggerFactoryOptions()
    .addLogGroupRule(new LogGroupRule(new RegExp("database.connect"), LogLevel.Debug))
    .addLogGroupRule(new LogGroupRule(new RegExp("database.+"), LogLevel.Info))
    .addLogGroupRule(new LogGroupRule(new RegExp("app.startApp"), LogLevel.Info));

export const factory: LoggerFactory = LFService.createNamedLoggerFactory("LoggerFactory", options);
