import { ConsoleLogger } from './loggers/ConsoleLogger';
import { DefaultFormatter } from './formatters/DefaultFormatter';
import { GoogleAnalyticsLogger } from './loggers/GoogleAnalyticsLogger';
import { LocalStorageLogger } from './loggers/LocalStorageLogger';
import { LogLevel } from './core/LogLevel';
import { NullLogger } from './loggers/NullLogger';
// imports for this file only
import { Injectable, EventEmitter } from '../node_modules/@angular/core';
import 'rxjs/Rx';
var Alogy = (function () {
    function Alogy() {
        /**
           * New log entry event -> triggers on new logs
           * @private
           * @type {number}
           * @memberof Alogy
           */
        this.newLogEntry = new EventEmitter();
        this.logGroupSize = 100;
        this._timestampProvider = function () { return new Date; };
    }
    /**
     * Set up Alogy - Global config
     *
     * @param {AlogyLogDestination[]} [logTo=[AlogyLogDestination.LOCAL_STORAGE]] Set this to ´GOOGLE_ANALYTICS´ to have that as upper layer, if ´LOCAL_STORAGE´, analytics is not used.
     * @param {ILocalStorageLoggerConfiguration} config Local storage config
     * @memberof Alogy
     */
    /**
       * Set up Alogy - Global config
       *
       * @param {AlogyLogDestination[]} [logTo=[AlogyLogDestination.LOCAL_STORAGE]] Set this to ´GOOGLE_ANALYTICS´ to have that as upper layer, if ´LOCAL_STORAGE´, analytics is not used.
       * @param {ILocalStorageLoggerConfiguration} config Local storage config
       * @memberof Alogy
       */
    Alogy.prototype.create = /**
       * Set up Alogy - Global config
       *
       * @param {AlogyLogDestination[]} [logTo=[AlogyLogDestination.LOCAL_STORAGE]] Set this to ´GOOGLE_ANALYTICS´ to have that as upper layer, if ´LOCAL_STORAGE´, analytics is not used.
       * @param {ILocalStorageLoggerConfiguration} config Local storage config
       * @memberof Alogy
       */
    function (logTo, config) {
        if (logTo === void 0) { logTo = AlogyLogDestination.LOCAL_STORAGE; }
        this.formatter = new DefaultFormatter();
        // Chain of responsibility style pattern here...
        this.chainTerminal = new NullLogger();
        this.consoleLogChain = new ConsoleLogger(this.formatter, this.chainTerminal);
        this.localStorageLogChain = new LocalStorageLogger(config, this.consoleLogChain);
        this.googleAnalyticsLogChain = new GoogleAnalyticsLogger(this.formatter, this.localStorageLogChain); //(config, this.localStorageLogChain);
    };
    /**
     * Get the logging interface which can be used to log and also to devide logs by group or sender.
     * @param {number} logGroup Log group ID. Select an integer
     * @param {AlogyLogDestination} [logTo=AlogyLogDestination.LOCAL_STORAGE] Log destination
     * @returns {LogAPI} The logging interface
     * @memberof Alogy
     */
    /**
       * Get the logging interface which can be used to log and also to devide logs by group or sender.
       * @param {number} logGroup Log group ID. Select an integer
       * @param {AlogyLogDestination} [logTo=AlogyLogDestination.LOCAL_STORAGE] Log destination
       * @returns {LogAPI} The logging interface
       * @memberof Alogy
       */
    Alogy.prototype.getLogAPI = /**
       * Get the logging interface which can be used to log and also to devide logs by group or sender.
       * @param {number} logGroup Log group ID. Select an integer
       * @param {AlogyLogDestination} [logTo=AlogyLogDestination.LOCAL_STORAGE] Log destination
       * @returns {LogAPI} The logging interface
       * @memberof Alogy
       */
    function (logGroup, logTo) {
        if (logTo === void 0) { logTo = AlogyLogDestination.LOCAL_STORAGE; }
        return new LogAPI(this, logTo, logGroup);
    };
    Alogy.prototype.writeToLog = function (logTo, level, message, logGroup, code) {
        var time = this._timestampProvider().toISOString();
        if (typeof code == 'undefined') {
            code = this.stringToLogCode(message, logGroup, this.logGroupSize);
        }
        else {
            code = this.codeToGroup(code, logGroup, this.logGroupSize);
        }
        /*
            * All logs trigger the newLogEntry event
            */
        this.newLogEntry.emit({
            code: code,
            message: message,
            time: time,
            level: level
        });
        /**
             * To outputs
             */
        switch (logTo) {
            case AlogyLogDestination.GOOGLE_ANALYTICS:
                console.error('not implemented yet'); /** @todo implement GOOGLE ANALYTICS LOGGING */
                /*this.localStorageLogChain.log({
                          level, time, message: message
                        });*/
                break;
            case AlogyLogDestination.MEMORY:
                this.consoleLogChain.log({
                    level: level, time: time, message: message, code: code
                });
                break;
            case AlogyLogDestination.LOCAL_STORAGE:
                this.localStorageLogChain.log({
                    level: level, time: time, message: message, code: code
                });
                break;
        }
    };
    /**
     * Returns an array with log entries formatted and returned as strings.
     * @returns {string[]} String array of logs in Local Storage
     * @memberof Alogy
     */
    /**
       * Returns an array with log entries formatted and returned as strings.
       * @returns {string[]} String array of logs in Local Storage
       * @memberof Alogy
       */
    Alogy.prototype.exportToStringArray = /**
       * Returns an array with log entries formatted and returned as strings.
       * @returns {string[]} String array of logs in Local Storage
       * @memberof Alogy
       */
    function () {
        var _this = this;
        return this.localStorageLogChain.allEntries().map(function (entry) { return _this.formatter.format(entry); });
    };
    /**
     * Returns an array with all <ILogEntry> in Local Storage
     * @returns {Array<ILogEntry>} All log entries
     * @memberof Alogy
     */
    /**
       * Returns an array with all <ILogEntry> in Local Storage
       * @returns {Array<ILogEntry>} All log entries
       * @memberof Alogy
       */
    Alogy.prototype.exportToLogEntryArray = /**
       * Returns an array with all <ILogEntry> in Local Storage
       * @returns {Array<ILogEntry>} All log entries
       * @memberof Alogy
       */
    function () {
        return this.localStorageLogChain.allEntries();
    };
    /**
     * Put log code into the log group.
     * @param {number} code Log code
     * @param {number} [logGroup=99] Log group
     * @returns {number} Log code within group
     * @memberof LogAPI
     */
    /**
       * Put log code into the log group.
       * @param {number} code Log code
       * @param {number} [logGroup=99] Log group
       * @returns {number} Log code within group
       * @memberof LogAPI
       */
    Alogy.prototype.codeToGroup = /**
       * Put log code into the log group.
       * @param {number} code Log code
       * @param {number} [logGroup=99] Log group
       * @returns {number} Log code within group
       * @memberof LogAPI
       */
    function (code, logGroup, logGroupSize) {
        if (logGroup === void 0) { logGroup = 99; }
        if (logGroupSize === void 0) { logGroupSize = 100; }
        var min = logGroup * this.logGroupSize;
        var max = min + (this.logGroupSize - 1);
        return (((code < min || code > (min + (this.logGroupSize - 1))) ? this.stringToLogCode(code.toString()) : code));
    };
    /**
     * Turn a string into a log code, if you don't know which to use or want it to be generated from the string
     * @param {String} stc String to turn into a 'code', an number within the range of the logging group
     * @param {number} [logGroup=99] Log group
     * @returns {number} Log code within group
     * @memberof LogAPI
     */
    /**
       * Turn a string into a log code, if you don't know which to use or want it to be generated from the string
       * @param {String} stc String to turn into a 'code', an number within the range of the logging group
       * @param {number} [logGroup=99] Log group
       * @returns {number} Log code within group
       * @memberof LogAPI
       */
    Alogy.prototype.stringToLogCode = /**
       * Turn a string into a log code, if you don't know which to use or want it to be generated from the string
       * @param {String} stc String to turn into a 'code', an number within the range of the logging group
       * @param {number} [logGroup=99] Log group
       * @returns {number} Log code within group
       * @memberof LogAPI
       */
    function (stc, logGroup, logGroupSize) {
        if (logGroup === void 0) { logGroup = 99; }
        if (logGroupSize === void 0) { logGroupSize = 100; }
        var prep = 0, code = 0;
        for (var i = 0; i < stc.length; i++) {
            prep += stc.charCodeAt(i);
        }
        var min = logGroup * this.logGroupSize;
        var fld = Math.floor((this.logGroupSize / prep) * this.logGroupSize);
        code = parseInt(logGroup + ((fld < 10) ? '0' : '') + fld);
        return (((code < min || code > (min + (this.logGroupSize - 1))) ? this.stringToLogCode(code.toString()) : code));
    };
    Alogy.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Alogy.ctorParameters = function () { return []; };
    return Alogy;
}());
export { Alogy };
var LogAPI = (function () {
    /**
     * Construct a new LogAPI instance
     * @param _alogy A reference to the used Alogy instance
     * @param logTo Log destination?
     * @param logGroup Which log group
     */
    function LogAPI(_alogy, logTo, logGroup) {
        if (logTo === void 0) { logTo = AlogyLogDestination.LOCAL_STORAGE; }
        if (logGroup === void 0) { logGroup = 99; }
        this._alogy = _alogy;
        this.logTo = logTo;
        this.logGroup = logGroup;
    }
    /**
     * Log this debug message [level: debug]
     *
     * @param {string} message Debug message
     * @param {number} [code] Log code (if empty: auto generated)
     * @memberof LogAPI
     */
    /**
       * Log this debug message [level: debug]
       *
       * @param {string} message Debug message
       * @param {number} [code] Log code (if empty: auto generated)
       * @memberof LogAPI
       */
    LogAPI.prototype.debug = /**
       * Log this debug message [level: debug]
       *
       * @param {string} message Debug message
       * @param {number} [code] Log code (if empty: auto generated)
       * @memberof LogAPI
       */
    function (message, code) {
        this._alogy.writeToLog(this.logTo, LogLevel.DEBUG, message, this.logGroup, code);
    };
    /**
     * Log this info message [level: info]
     *
     * @param {string} message Info message
     * @param {number} [code] Log code (if empty: auto generated)
     * @memberof LogAPI
     */
    /**
       * Log this info message [level: info]
       *
       * @param {string} message Info message
       * @param {number} [code] Log code (if empty: auto generated)
       * @memberof LogAPI
       */
    LogAPI.prototype.info = /**
       * Log this info message [level: info]
       *
       * @param {string} message Info message
       * @param {number} [code] Log code (if empty: auto generated)
       * @memberof LogAPI
       */
    function (message, code) {
        this._alogy.writeToLog(this.logTo, LogLevel.INFO, message, this.logGroup, code);
    };
    /**
     * Log this warning message [level: warn]
     *
     * @param {string} message Warning message
     * @param {number} [code] Log code (if empty: auto generated)
     * @memberof LogAPI
     */
    /**
       * Log this warning message [level: warn]
       *
       * @param {string} message Warning message
       * @param {number} [code] Log code (if empty: auto generated)
       * @memberof LogAPI
       */
    LogAPI.prototype.warn = /**
       * Log this warning message [level: warn]
       *
       * @param {string} message Warning message
       * @param {number} [code] Log code (if empty: auto generated)
       * @memberof LogAPI
       */
    function (message, code) {
        this._alogy.writeToLog(this.logTo, LogLevel.WARN, message, this.logGroup, code);
    };
    /**
     * Log this error message [level: error]
     *
     * @param {string} message Error message
     * @param {number} [code] Log code (if empty: auto generated)
     * @memberof LogAPI
     */
    /**
       * Log this error message [level: error]
       *
       * @param {string} message Error message
       * @param {number} [code] Log code (if empty: auto generated)
       * @memberof LogAPI
       */
    LogAPI.prototype.error = /**
       * Log this error message [level: error]
       *
       * @param {string} message Error message
       * @param {number} [code] Log code (if empty: auto generated)
       * @memberof LogAPI
       */
    function (message, code) {
        this._alogy.writeToLog(this.logTo, LogLevel.ERROR, message, this.logGroup, code);
    };
    return LogAPI;
}());
export { LogAPI };
export var AlogyLogDestination;
(function (AlogyLogDestination) {
    /**
     * @description Only log to memory
     */
    AlogyLogDestination[AlogyLogDestination["MEMORY"] = 0] = "MEMORY";
    /**
     * @description Log to local storage
     */
    AlogyLogDestination[AlogyLogDestination["LOCAL_STORAGE"] = 1] = "LOCAL_STORAGE";
    /**
     * @description Not implemented yet
     * @ignore
     */
    AlogyLogDestination[AlogyLogDestination["GOOGLE_ANALYTICS"] = 2] = "GOOGLE_ANALYTICS"; // GA -> LS -> CONSOLE
})(AlogyLogDestination || (AlogyLogDestination = {}));
//# sourceMappingURL=alogy.js.map