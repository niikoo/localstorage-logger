import { ILogger } from './ILogger';
import { ILogEntry } from '../core/ILogEntry';
import { ILogEntryFormatter } from '../formatters/ILogEntryFormatter';
/**
 * Logger that logs to to Google Analytics
 * @todo Not complete - needs implementation
 */
var /**
 * Logger that logs to to Google Analytics
 * @todo Not complete - needs implementation
 */
GoogleAnalyticsLogger = /** @class */ (function () {
    /**
     * Constructs a GA logger
     * @param _formatter The formatter used to format the entry for the console
     * @param _nextLogger The next logger in the "log chain"
     */
    function GoogleAnalyticsLogger(_formatter, _nextLogger) {
        this._formatter = _formatter;
        this._nextLogger = _nextLogger;
    }
    /**
     * Logs an entry to GA
     * @param entry The entry to log
     */
    /**
         * Logs an entry to GA
         * @param entry The entry to log
         */
    GoogleAnalyticsLogger.prototype.log = /**
         * Logs an entry to GA
         * @param entry The entry to log
         */
    function (entry) {
    };
    return GoogleAnalyticsLogger;
}());
/**
 * Logger that logs to to Google Analytics
 * @todo Not complete - needs implementation
 */
export { GoogleAnalyticsLogger };
//# sourceMappingURL=GoogleAnalyticsLogger.js.map