/**
 * A logger that doesn't actually do anything. Used for terminating a chain of loggers.
 */
var NullLogger = (function () {
    function NullLogger() {
    }
    /**
     * No-op
     */
    NullLogger.prototype.log = function (entry) {
    };
    return NullLogger;
}());
export { NullLogger };
//# sourceMappingURL=NullLogger.js.map