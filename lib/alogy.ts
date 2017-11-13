import { ILogEntry } from './core/ILogEntry';
import { ConsoleLogger } from './loggers/ConsoleLogger';
import { DefaultFormatter } from './formatters/DefaultFormatter';
import { GoogleAnalyticsLogger } from './loggers/GoogleAnalyticsLogger';
import { ILocalStorageLoggerConfiguration } from './loggers/ILocalStorageLoggerConfiguration';
import { ILog } from './ILog';
import { IQueueConfiguration } from './queue/IQueueConfiguration';
import { LimitedSizeQueue } from './queue/LimitedSizeQueue';
import { LocalStorageLogger } from './loggers/LocalStorageLogger';
import { LogLevel } from './core/LogLevel';
import { NullLogger } from './loggers/NullLogger';

// imports for this file only
import { Subject } from "rxjs/Subject";

export class Alogy {
  private _alogy: ILog;
  private formatter: DefaultFormatter;
  private chainTerminal: NullLogger;
  private consoleLogChain: ConsoleLogger;
  private localStorageLogChain: LocalStorageLogger;
  private googleAnalyticsLogChain: GoogleAnalyticsLogger;
  /**
   * New log entry event -> triggers on new logs
   * @private
   * @type {number}
   * @memberof Alogy
   */
  public newLogEntry: Subject<ILogEntry> = new Subject<ILogEntry>();
  private logGroupSize: number = 100; // Size of log group.Do not touch, unless you're know what you're doing. Default 100, that is for example 0- 99. With group 6, it's: 600-699
  private _timestampProvider: () => Date = () => new Date;
  /**
   * Set up Alogy - Global config
   *
   * @param {AlogyLogDestination[]} [logTo=[AlogyLogDestination.LOCAL_STORAGE]] Set this to ´GOOGLE_ANALYTICS´ to have that as upper layer, if ´LOCAL_STORAGE´, analytics is not used.
   * @param {ILocalStorageLoggerConfiguration} config Local storage config
   * @memberof Alogy
   */
  create(
    logTo: AlogyLogDestination = AlogyLogDestination.LOCAL_STORAGE,
    config: ILocalStorageLoggerConfiguration
  ){
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
  getLogAPI(
    logGroup: number,
    logTo: AlogyLogDestination = AlogyLogDestination.LOCAL_STORAGE
  ):LogAPI {
    return new LogAPI(this, logTo, logGroup);
  }

  writeToLog(logTo: AlogyLogDestination, level: LogLevel, message: string, logGroup: number, code?: number) {
    let time = this._timestampProvider().toISOString();
    if(typeof code == 'undefined') {
      code = this.stringToLogCode(message, logGroup, this.logGroupSize)
    } else {
      code = this.codeToGroup(code, logGroup, this.logGroupSize);
    }
    /*
    * All logs trigger the newLogEntry event
    */
    this.newLogEntry.next((<ILogEntry>{
      code: code,
      message: message,
      time: time,
      level: level
    }));

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
          level, time, message, code
        });
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
   * @param {AlogyLogDestination} from - Log source
   * @returns {string[]} String array of logs in Local Storage
   * @memberof Alogy
   */
  exportToStringArray(from: AlogyLogDestination): string[] {
    switch(from) {
      case AlogyLogDestination.MEMORY:
        return this.consoleLogChain.allEntries().map(
          entry => this.formatter.format(entry)
        );
      case AlogyLogDestination.LOCAL_STORAGE:
        return this.localStorageLogChain.allEntries().map(
          entry => this.formatter.format(entry)
        );
      default:
        return [<ILogEntry>{ level: 1, code: -1, message: '[ALOGY][LOG EXPORT] Wrong log source'}].map(
          entry => this.formatter.format(entry)
        );
    }
  }

  /**
   * Returns an array with all <ILogEntry> in Local Storage
   * @param {AlogyLogDestination} from - Log source
   * @returns {Array<ILogEntry>} All log entries
   * @memberof Alogy
   */
  exportToLogEntryArray(from: AlogyLogDestination): Array<ILogEntry> {
    switch(from) {
      case AlogyLogDestination.MEMORY:
        return this.consoleLogChain.allEntries();
      case AlogyLogDestination.LOCAL_STORAGE:
        return this.localStorageLogChain.allEntries();
      default:
        return [
          <ILogEntry>{ level: 1, code: -1, message: '[ALOGY][LOG EXPORT] Wrong log source'}
        ];
    }
  }

  /**
   * Put log code into the log group.
   * @param {number} code Log code
   * @param {number} [logGroup=99] Log group
   * @returns {number} Log code within group
   * @memberof LogAPI
   */
  codeToGroup(code: number, logGroup: number = 99, logGroupSize: number = 100): number {
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
  stringToLogCode(stc: String, logGroup: number = 99, logGroupSize: number = 100): number {
    let prep = 0, code = 0;
    for (let i = 0; i < stc.length; i++) { prep += stc.charCodeAt(i); }
    let min = logGroup * this.logGroupSize;
    let fld = Math.floor((this.logGroupSize / prep) * this.logGroupSize);
    code = parseInt(logGroup + ((fld < 10) ? '0' : '') + fld);
    return (((code < min || code > (min + (this.logGroupSize - 1))) ? this.stringToLogCode(code.toString()) : code));
  }
}

export class LogAPI implements ILog {
  /**
   * Construct a new LogAPI instance
   * @param _alogy A reference to the used Alogy instance
   * @param logTo Log destination?
   * @param logGroup Which log group
   */
  constructor(
    private _alogy: Alogy,
    private logTo: AlogyLogDestination = AlogyLogDestination.LOCAL_STORAGE,
    private logGroup: number = 99
  ) {
  }
  /**
   * Log this debug message [level: debug]
   *
   * @param {string} message Debug message
   * @param {number} [code] Log code (if empty: auto generated)
   * @memberof LogAPI
   */
  debug(message: string, code ?: number) {
    this._alogy.writeToLog(this.logTo, LogLevel.DEBUG, message, this.logGroup, code);
  }
  /**
   * Log this info message [level: info]
   *
   * @param {string} message Info message
   * @param {number} [code] Log code (if empty: auto generated)
   * @memberof LogAPI
   */

  info(message: string, code ?: number) {
    this._alogy.writeToLog(this.logTo, LogLevel.INFO, message, this.logGroup, code);
  }
  /**
   * Log this warning message [level: warn]
   *
   * @param {string} message Warning message
   * @param {number} [code] Log code (if empty: auto generated)
   * @memberof LogAPI
   */
  warn(message: string, code ?: number) {
    this._alogy.writeToLog(this.logTo, LogLevel.WARN, message, this.logGroup, code);
  }
  /**
   * Log this error message [level: error]
   *
   * @param {string} message Error message
   * @param {number} [code] Log code (if empty: auto generated)
   * @memberof LogAPI
   */
  error(message: string, code ?: number) {
    this._alogy.writeToLog(this.logTo, LogLevel.ERROR, message, this.logGroup, code);
  }
}

export enum AlogyLogDestination {
  /**
   * @description Only log to memory
   */
  MEMORY,
  /**
   * @description Log to local storage
   */
  LOCAL_STORAGE, // LS -> CONSOLE
  /**
   * @description Not implemented yet
   * @ignore
   */
  GOOGLE_ANALYTICS // GA -> LS -> CONSOLE
}
