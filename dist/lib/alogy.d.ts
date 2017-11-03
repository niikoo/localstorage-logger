import { ILogEntry } from './core/ILogEntry';
import { ILocalStorageLoggerConfiguration } from './loggers/ILocalStorageLoggerConfiguration';
import { ILog } from './ILog';
import { LogLevel } from './core/LogLevel';
import { EventEmitter } from '../node_modules/@angular/core';
import 'rxjs/Rx';
export declare class Alogy {
    private _alogy;
    private formatter;
    private chainTerminal;
    private consoleLogChain;
    private localStorageLogChain;
    private googleAnalyticsLogChain;
    /**
     * New log entry event -> triggers on new logs
     * @private
     * @type {number}
     * @memberof Alogy
     */
    newLogEntry: EventEmitter<ILogEntry>;
    private logGroupSize;
    private _timestampProvider;
    /**
     * Set up Alogy - Global config
     *
     * @param {AlogyLogDestination[]} [logTo=[AlogyLogDestination.LOCAL_STORAGE]] Set this to ´GOOGLE_ANALYTICS´ to have that as upper layer, if ´LOCAL_STORAGE´, analytics is not used.
     * @param {ILocalStorageLoggerConfiguration} config Local storage config
     * @memberof Alogy
     */
    create(logTo: AlogyLogDestination | undefined, config: ILocalStorageLoggerConfiguration): void;
    /**
     * Get the logging interface which can be used to log and also to devide logs by group or sender.
     * @param {number} logGroup Log group ID. Select an integer
     * @param {AlogyLogDestination} [logTo=AlogyLogDestination.LOCAL_STORAGE] Log destination
     * @returns {LogAPI} The logging interface
     * @memberof Alogy
     */
    getLogAPI(logGroup: number, logTo?: AlogyLogDestination): LogAPI;
    writeToLog(logTo: AlogyLogDestination, level: LogLevel, message: string, logGroup: number, code?: number): void;
    /**
     * Returns an array with log entries formatted and returned as strings.
     * @returns {string[]} String array of logs in Local Storage
     * @memberof Alogy
     */
    exportToStringArray(): string[];
    /**
     * Returns an array with all <ILogEntry> in Local Storage
     * @returns {Array<ILogEntry>} All log entries
     * @memberof Alogy
     */
    exportToLogEntryArray(): Array<ILogEntry>;
    /**
     * Put log code into the log group.
     * @param {number} code Log code
     * @param {number} [logGroup=99] Log group
     * @returns {number} Log code within group
     * @memberof LogAPI
     */
    codeToGroup(code: number, logGroup?: number, logGroupSize?: number): number;
    /**
     * Turn a string into a log code, if you don't know which to use or want it to be generated from the string
     * @param {String} stc String to turn into a 'code', an number within the range of the logging group
     * @param {number} [logGroup=99] Log group
     * @returns {number} Log code within group
     * @memberof LogAPI
     */
    stringToLogCode(stc: String, logGroup?: number, logGroupSize?: number): number;
}
export declare class LogAPI implements ILog {
    private _alogy;
    private logTo;
    private logGroup;
    /**
     * Construct a new LogAPI instance
     * @param _alogy A reference to the used Alogy instance
     * @param logTo Log destination?
     * @param logGroup Which log group
     */
    constructor(_alogy: Alogy, logTo?: AlogyLogDestination, logGroup?: number);
    /**
     * Log this debug message [level: debug]
     *
     * @param {string} message Debug message
     * @param {number} [code] Log code (if empty: auto generated)
     * @memberof LogAPI
     */
    debug(message: string, code?: number): void;
    /**
     * Log this info message [level: info]
     *
     * @param {string} message Info message
     * @param {number} [code] Log code (if empty: auto generated)
     * @memberof LogAPI
     */
    info(message: string, code?: number): void;
    /**
     * Log this warning message [level: warn]
     *
     * @param {string} message Warning message
     * @param {number} [code] Log code (if empty: auto generated)
     * @memberof LogAPI
     */
    warn(message: string, code?: number): void;
    /**
     * Log this error message [level: error]
     *
     * @param {string} message Error message
     * @param {number} [code] Log code (if empty: auto generated)
     * @memberof LogAPI
     */
    error(message: string, code?: number): void;
}
export declare enum AlogyLogDestination {
    /**
     * @description Only log to memory
     */
    MEMORY = 0,
    /**
     * @description Log to local storage
     */
    LOCAL_STORAGE = 1,
    /**
     * @description Not implemented yet
     * @ignore
     */
    GOOGLE_ANALYTICS = 2,
}
