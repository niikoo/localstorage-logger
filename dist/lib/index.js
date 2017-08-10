import { ConsoleLogger } from './loggers/ConsoleLogger';
import { DefaultFormatter } from './formatters/DefaultFormatter';
import { GoogleAnalyticsLogger } from './loggers/GoogleAnalyticsLogger';
import { LocalStorageLogger } from './loggers/LocalStorageLogger';
import { LogLevel } from './core/LogLevel';
import { NullLogger } from './loggers/NullLogger';
export { LimitedSizeQueue } from './queue/LimitedSizeQueue';
export { LocalStorageLogger } from './loggers/LocalStorageLogger';
export { ConsoleLogger } from './loggers/ConsoleLogger';
export { NullLogger } from './loggers/NullLogger';
export { DefaultFormatter } from './formatters/DefaultFormatter';
export { LogLevel } from './core/LogLevel';
export { GoogleAnalyticsLogger } from './loggers/GoogleAnalyticsLogger';
// imports for this file only
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
export class Alogy {
    constructor() {
        /**
         * New log entry event -> triggers on new logs
         * @private
         * @type {number}
         * @memberof Alogy
         */
        this.newLogEntry = new EventEmitter();
        this.logGroupSize = 100; // Size of log group.Do not touch, unless you're know what you're doing. Default 100, that is for example 0- 99. With group 6, it's: 600-699
        this._timestampProvider = () => new Date;
    }
    /**
     * Set up Alogy - Global config
     *
     * @param {AlogyLogDestination[]} [logTo=[AlogyLogDestination.LOCAL_STORAGE]] Set this to ´GOOGLE_ANALYTICS´ to have that as upper layer, if ´LOCAL_STORAGE´, analytics is not used.
     * @param {ILocalStorageLoggerConfiguration} config Local storage config
     * @memberof Alogy
     */
    create(logTo = AlogyLogDestination.LOCAL_STORAGE, config) {
        this.formatter = new DefaultFormatter();
        // Chain of responsibility style pattern here...
        this.chainTerminal = new NullLogger();
        this.consoleLogChain = new ConsoleLogger(this.formatter, this.chainTerminal);
        this.localStorageLogChain = new LocalStorageLogger(config, this.consoleLogChain);
        this.googleAnalyticsLogChain = new GoogleAnalyticsLogger(this.formatter, this.localStorageLogChain); //(config, this.localStorageLogChain);
    }
    /**
     * Get the logging interface which can be used to log and also to devide logs by group or sender.
     * @param {number} logGroup Log group ID. Select an integer
     * @param {AlogyLogDestination} [logTo=AlogyLogDestination.LOCAL_STORAGE] Log destination
     * @returns {LogAPI} The logging interface
     * @memberof Alogy
     */
    getLogAPI(logGroup, logTo = AlogyLogDestination.LOCAL_STORAGE) {
        return new LogAPI(this, logTo, logGroup);
    }
    writeToLog(logTo, level, message, logGroup, code) {
        let time = this._timestampProvider().toISOString();
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
            case AlogyLogDestination.LOCAL_STORAGE:
                this.localStorageLogChain.log({
                    level, time, message, code
                });
                break;
        }
    }
    /**
     * Returns an array with log entries formatted and returned as strings.
     * @returns {string[]} String array of logs in Local Storage
     * @memberof Alogy
     */
    exportToStringArray() {
        return this.localStorageLogChain.allEntries().map(entry => this.formatter.format(entry));
    }
    /**
     * Returns an array with all <ILogEntry> in Local Storage
     * @returns {Array<ILogEntry>} All log entries
     * @memberof Alogy
     */
    exportToLogEntryArray() {
        return this.localStorageLogChain.allEntries();
    }
    /**
     * Put log code into the log group.
     * @param {number} code Log code
     * @param {number} [logGroup=99] Log group
     * @returns {number} Log code within group
     * @memberof LogAPI
     */
    codeToGroup(code, logGroup = 99, logGroupSize = 100) {
        let min = logGroup * this.logGroupSize;
        let max = min + (this.logGroupSize - 1);
        return (((code < min || code > (min + (this.logGroupSize - 1))) ? this.stringToLogCode(code.toString()) : code));
    }
    /**
     * Turn a string into a log code, if you don't know which to use or want it to be generated from the string
     * @param {String} stc String to turn into a 'code', an number within the range of the logging group
     * @param {number} [logGroup=99] Log group
     * @returns {number} Log code within group
     * @memberof LogAPI
     */
    stringToLogCode(stc, logGroup = 99, logGroupSize = 100) {
        let prep = 0, code = 0;
        for (let i = 0; i < stc.length; i++) {
            prep += stc.charCodeAt(i);
        }
        let min = logGroup * this.logGroupSize;
        let fld = Math.floor((this.logGroupSize / prep) * this.logGroupSize);
        code = parseInt(logGroup + ((fld < 10) ? '0' : '') + fld);
        return (((code < min || code > (min + (this.logGroupSize - 1))) ? this.stringToLogCode(code.toString()) : code));
    }
}
Alogy.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Alogy.ctorParameters = () => [];
export class LogAPI {
    /**
     * Construct a new LogAPI instance
     * @param _alogy A reference to the used Alogy instance
     * @param logTo Log destination?
     * @param logGroup Which log group
     */
    constructor(_alogy, logTo = AlogyLogDestination.LOCAL_STORAGE, logGroup = 99) {
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
    debug(message, code) {
        this._alogy.writeToLog(this.logTo, LogLevel.DEBUG, message, this.logGroup, code);
    }
    /**
     * Log this info message [level: info]
     *
     * @param {string} message Info message
     * @param {number} [code] Log code (if empty: auto generated)
     * @memberof LogAPI
     */
    info(message, code) {
        this._alogy.writeToLog(this.logTo, LogLevel.INFO, message, this.logGroup, code);
    }
    /**
     * Log this warning message [level: warn]
     *
     * @param {string} message Warning message
     * @param {number} [code] Log code (if empty: auto generated)
     * @memberof LogAPI
     */
    warn(message, code) {
        this._alogy.writeToLog(this.logTo, LogLevel.WARN, message, this.logGroup, code);
    }
    /**
     * Log this error message [level: error]
     *
     * @param {string} message Error message
     * @param {number} [code] Log code (if empty: auto generated)
     * @memberof LogAPI
     */
    error(message, code) {
        this._alogy.writeToLog(this.logTo, LogLevel.ERROR, message, this.logGroup, code);
    }
}
export var AlogyLogDestination;
(function (AlogyLogDestination) {
    /**
     * @description Log to local storage
     */
    AlogyLogDestination[AlogyLogDestination["LOCAL_STORAGE"] = 0] = "LOCAL_STORAGE";
    /**
     * @description Not implemented yet
     * @ignore
     */
    AlogyLogDestination[AlogyLogDestination["GOOGLE_ANALYTICS"] = 1] = "GOOGLE_ANALYTICS"; // GA -> LS -> CONSOLE
})(AlogyLogDestination || (AlogyLogDestination = {}));
//# sourceMappingURL=index.js.map