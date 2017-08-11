import { LogLevel } from '../core/LogLevel';
/**
 * Provides the default formatting for a log entry. E.g., "[2015-01-12 00:01:08] [INFO] Message blah blah..."
 */
var DefaultFormatter = (function () {
    function DefaultFormatter() {
    }
    /**
     * Formats a log entry as [TIME] [LEVEL] MESSAGE
     * @param entry The log entry
     */
    DefaultFormatter.prototype.format = function (entry) {
        return "[" + entry.time + "] [" + LogLevel[entry.level] + "] " + entry.message;
    };
    return DefaultFormatter;
}());
export { DefaultFormatter };
//# sourceMappingURL=DefaultFormatter.js.map