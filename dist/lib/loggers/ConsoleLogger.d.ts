import { ILogger } from './ILogger';
import { ILogEntry } from '../core/ILogEntry';
import { ILogEntryFormatter } from '../formatters/ILogEntryFormatter';
/**
 * Logger that logs to the console.
 */
export declare class ConsoleLogger implements ILogger {
    private _formatter;
    private _nextLogger;
    private entries;
    /**
     * Constructs a console logger.
     * @param _formatter The formatter used to format the entry for the console
     * @param _nextLogger The next logger in the "log chain"
     */
    constructor(_formatter: ILogEntryFormatter, _nextLogger: ILogger);
    /**
     * Logs an entry to the console.
     * @param entry The entry to log
     */
    log(entry: ILogEntry): void;
    /**
     * Returns all log entries that are still held in local storage.
     */
    allEntries(): Array<ILogEntry>;
}
