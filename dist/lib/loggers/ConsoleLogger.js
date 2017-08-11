import { LogLevel } from '../core/LogLevel';
/**
 * Logger that logs to the console.
 */
var ConsoleLogger = (function () {
    /**
     * Constructs a console logger.
     * @param _formatter The formatter used to format the entry for the console
     * @param _nextLogger The next logger in the "log chain"
     */
    function ConsoleLogger(_formatter, _nextLogger) {
        this._formatter = _formatter;
        this._nextLogger = _nextLogger;
    }
    /**
     * Logs an entry to the console.
     * @param entry The entry to log
     */
    ConsoleLogger.prototype.log = function (entry) {
        var formattedMessage = this._formatter.format(entry);
        switch (entry.level) {
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
        this._nextLogger.log(entry);
    };
    return ConsoleLogger;
}());
export { ConsoleLogger };
//# sourceMappingURL=ConsoleLogger.js.map