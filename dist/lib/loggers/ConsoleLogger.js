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
        console.log(formattedMessage);
        this._nextLogger.log(entry);
    };
    return ConsoleLogger;
}());
export { ConsoleLogger };
//# sourceMappingURL=ConsoleLogger.js.map