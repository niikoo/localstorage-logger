export { IQueueConfiguration } from './queue/IQueueConfiguration';
export { LimitedSizeQueue } from './queue/LimitedSizeQueue';
export { ILocalStorageLoggerConfiguration } from './loggers/ILocalStorageLoggerConfiguration';
export { LocalStorageLogger } from './loggers/LocalStorageLogger';
export { ConsoleLogger } from './loggers/ConsoleLogger';
export { NullLogger } from './loggers/NullLogger';
export { DefaultFormatter } from './formatters/DefaultFormatter';
export { LogLevel } from './core/LogLevel';
export { ILog } from './ILog';
export { GoogleAnalyticsLogger } from './loggers/GoogleAnalyticsLogger';
export { ILogEntry } from './core/ILogEntry';
export { Alogy, AlogyLogDestination, LogAPI } from './alogy';
export { Bookkeeper } from './queue/Bookkeeper';
export { Node } from './queue/Node';
export declare class AlogyModule {
}
