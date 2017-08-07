import { ILogEntry } from './core/ILogEntry';
import { ILocalStorageLoggerConfiguration } from './loggers/ILocalStorageLoggerConfiguration';
import { ILog } from './ILog';
import { LogLevel } from './core/LogLevel';
export { IQueueConfiguration } from './queue/IQueueConfiguration';
export { LimitedSizeQueue } from './queue/LimitedSizeQueue';
export { ILocalStorageLoggerConfiguration } from './loggers/ILocalStorageLoggerConfiguration';
export { LocalStorageLogger } from './loggers/LocalStorageLogger';
export { ConsoleLogger } from './loggers/ConsoleLogger';
export { NullLogger } from './loggers/NullLogger';
export { DefaultFormatter } from './formatters/DefaultFormatter';
export { LogLevel } from './core/LogLevel';
export { ILog } from './ILog';
export { GoogleAnalyticsLogger } from './loggers/GoogleAnalyticsLogger';
export { ILogEntry } from './core/ILogEntry';
import { EventEmitter } from '@angular/core';
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
    getLogAPI(logGroup: number, logTo?: AlogyLogDestination): LogAPI;
    writeToLog(logTo: AlogyLogDestination, level: LogLevel, message: string, logGroup: number, code?: number): void;
    exportToArray(): string[];
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
    debug(message: string, code?: number): void;
    info(message: string, code?: number): void;
    warn(message: string, code?: number): void;
    error(message: string, code?: number): void;
}
export declare enum AlogyLogDestination {
    LOCAL_STORAGE = 0,
    GOOGLE_ANALYTICS = 1,
}
