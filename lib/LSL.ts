export {IQueueConfiguration} from './queue/IQueueConfiguration';
export {LimitedSizeQueue} from './queue/LimitedSizeQueue';

export {ILocalStorageLoggerConfiguration} from './loggers/ILocalStorageLoggerConfiguration';
export {LocalStorageLogger} from './loggers/LocalStorageLogger';
export {ConsoleLogger} from './loggers/ConsoleLogger';
export {NullLogger} from './loggers/NullLogger';

export {DefaultFormatter} from './formatters/DefaultFormatter';

export {ngAlogyBootstrapper} from './ng-alogy';

import {ILocalStorageLoggerConfiguration} from './loggers/ILocalStorageLoggerConfiguration';
import {ngAlogyBootstrapper} from './ng-alogy';
import {ILog} from './ILog';
const defaultBootstrapper = new ngAlogyBootstrapper();
export default function createLog(config:ILocalStorageLoggerConfiguration) : ILog {
  return defaultBootstrapper.bootstrap(config);
}
