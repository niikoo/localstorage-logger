import { LogLevel } from '../core/LogLevel';
import { ILogEntry } from '../core/ILogEntry';
import { ILogEntryFormatter } from './ILogEntryFormatter';
/**
 * Provides the default formatting for a log entry. E.g., "[2015-01-12 00:01:08] [INFO] Message blah blah..."
 */
var /**
 * Provides the default formatting for a log entry. E.g., "[2015-01-12 00:01:08] [INFO] Message blah blah..."
 */
DefaultFormatter = /** @class */ (function () {
    function DefaultFormatter() {
    }
    /**
     * Formats a log entry as [TIME] [LEVEL] MESSAGE
     * @param entry The log entry
     */
    /**
       * Formats a log entry as [TIME] [LEVEL] MESSAGE
       * @param entry The log entry
       */
    DefaultFormatter.prototype.format = /**
       * Formats a log entry as [TIME] [LEVEL] MESSAGE
       * @param entry The log entry
       */
    function (entry) {
        return "[" + entry.time + "] [" + LogLevel[entry.level] + "] " + entry.message;
    };
    return DefaultFormatter;
}());
/**
 * Provides the default formatting for a log entry. E.g., "[2015-01-12 00:01:08] [INFO] Message blah blah..."
 */
export { DefaultFormatter };
//# sourceMappingURL=DefaultFormatter.js.map