import {ILogger} from './ILogger';
import {ILogEntry} from '../core/ILogEntry';
import {ILogEntryFormatter} from '../formatters/ILogEntryFormatter';
import { LogLevel } from '../core/LogLevel';

/**
 * Logger that logs to the console.
 */
export class ConsoleLogger implements ILogger {
  private entries: Array<ILogEntry> = [];
  /**
   * Constructs a console logger.
   * @param _formatter The formatter used to format the entry for the console
   * @param _nextLogger The next logger in the "log chain"
   */
  constructor(private _formatter: ILogEntryFormatter, private _nextLogger: ILogger) {
  }

  /**
   * Logs an entry to the console.
   * @param entry The entry to log
   */
  log(entry: ILogEntry) {
    const formattedMessage = this._formatter.format(entry);
    switch(entry.level) {
      case LogLevel.DEBUG:
        console.log(formattedMessage);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.TRACE:
        console.trace(formattedMessage);
        break;
      default:
        console.debug('ERROR! UNKNOWN LOG LEVEL. Message: ' + formattedMessage);
        break;
    }
    this.entries.push(entry);
    this._nextLogger.log(entry);
  }
  /**
   * Returns all log entries that are still held in local storage.
   */
  allEntries() : Array<ILogEntry> {
    return this.entries;
  }
}
