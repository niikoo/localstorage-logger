import { ILogEntry } from './core/ILogEntry';
import { ConsoleLogger } from './loggers/ConsoleLogger';
import { DefaultFormatter } from './formatters/DefaultFormatter';
import { GoogleAnalyticsLogger } from './loggers/GoogleAnalyticsLogger';
import { ILocalStorageLoggerConfiguration } from './loggers/ILocalStorageLoggerConfiguration';
import { ILog } from './ILog';
import { IQueueConfiguration } from './queue/IQueueConfiguration';
import { LimitedSizeQueue } from './queue/LimitedSizeQueue';
import { LocalStorageLogger } from './loggers/LocalStorageLogger';
import { LogLevel } from './core/LogLevel';
import { NullLogger } from './loggers/NullLogger';
import { NgModule } from '@angular/core';
import { Alogy, AlogyLogDestination, LogAPI } from './alogy';
import { Bookkeeper } from './queue/Bookkeeper';
import { Node } from './queue/Node';

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

@NgModule({
  providers: [
    Alogy
  ]
})
export class AlogyModule {}
