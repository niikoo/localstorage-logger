import { ILogger } from './ILogger';
import { ILogEntry } from '../core/ILogEntry';
import { ILogEntryFormatter } from '../formatters/ILogEntryFormatter';
/**
 * Logger that logs to to Google Analytics
 * @todo Not complete - needs implementation
 */
export declare class GoogleAnalyticsLogger implements ILogger {
    private _formatter;
    private _nextLogger;
    /**
     * Constructs a GA logger
     * @param _formatter The formatter used to format the entry for the console
     * @param _nextLogger The next logger in the "log chain"
     */
    constructor(_formatter: ILogEntryFormatter, _nextLogger: ILogger);
    /**
     * Logs an entry to GA
     * @param entry The entry to log
     */
    log(entry: ILogEntry): void;
}
