/**
 * Logger that logs to to Google Analytics
 * @todo Not complete - needs implementation
 */
var GoogleAnalyticsLogger = (function () {
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
    GoogleAnalyticsLogger.prototype.log = function (entry) {
    };
    return GoogleAnalyticsLogger;
}());
export { GoogleAnalyticsLogger };
//# sourceMappingURL=GoogleAnalyticsLogger.js.map