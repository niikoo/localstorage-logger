import { ILogEntry } from './../core/ILogEntry';
import { ILogger } from './ILogger';
/**
 * A logger that doesn't actually do anything. Used for terminating a chain of loggers.
 */
var /**
 * A logger that doesn't actually do anything. Used for terminating a chain of loggers.
 */
NullLogger = /** @class */ (function () {
    function NullLogger() {
    }
    /**
     * No-op
     */
    /**
       * No-op
       */
    NullLogger.prototype.log = /**
       * No-op
       */
    function (entry) {
    };
    return NullLogger;
}());
/**
 * A logger that doesn't actually do anything. Used for terminating a chain of loggers.
 */
export { NullLogger };
//# sourceMappingURL=NullLogger.js.map