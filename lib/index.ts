import { NgModule } from '@angular/core';
export {IQueueConfiguration} from './queue/IQueueConfiguration';
export {LimitedSizeQueue} from './queue/LimitedSizeQueue';
import { ConsoleLogger } from './loggers/ConsoleLogger';
export {ILocalStorageLoggerConfiguration} from './loggers/ILocalStorageLoggerConfiguration';
export {LocalStorageLogger} from './loggers/LocalStorageLogger';
export {ConsoleLogger} from './loggers/ConsoleLogger';
export {NullLogger} from './loggers/NullLogger';

export {DefaultFormatter} from './formatters/DefaultFormatter';

import {ILocalStorageLoggerConfiguration} from './loggers/ILocalStorageLoggerConfiguration';
import {ILog} from './ILog';
import { Injectable } from '@angular/core';
import { LogLevel } from './core/LogLevel';
import { GoogleAnalyticsLogger } from './loggers/GoogleAnalyticsLogger';
import { LocalStorageLogger } from './loggers/LocalStorageLogger';
import { DefaultFormatter } from './formatters/DefaultFormatter';
import { NullLogger } from './loggers/NullLogger';

@Injectable()
export class Alogy {
  private _alogy: ILog;
  public formatter: DefaultFormatter;
  private chainTerminal: NullLogger;
  private consoleLogChain: ConsoleLogger;
  public localStorageLogChain: LocalStorageLogger;
  private googleAnalyticsLogChain: GoogleAnalyticsLogger;
  private _timestampProvider: () => Date = () => new Date;
  /**
   * Set up Alogy - Global config
   * 
   * 
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

  getLogAPI(
    logGroup: number,
    logTo: AlogyLogDestination = AlogyLogDestination.LOCAL_STORAGE
  ):LogAPI {
    return new LogAPI(this, logTo, logGroup);
  }

  writeToLog(logTo: AlogyLogDestination, level: LogLevel, message: string, logCodeGroup: number, code?: number) {
    let time = this._timestampProvider().toISOString();
    /** @todo Missing logCodeGroup + code config */
    switch (logTo) {
      case AlogyLogDestination.GOOGLE_ANALYTICS:
        console.error('not implemented yet'); /** @todo implement GOOGLE ANALYTICS LOGGING */  
        /*this.localStorageLogChain.log({
          level, time, message: message
        });*/
        break;
      case AlogyLogDestination.LOCAL_STORAGE:
        this.localStorageLogChain.log({
          level, time, message: message
        });
        break;
    }
  }
}

export class LogAPI implements ILog {
  constructor(
    private _alogy: Alogy,
    private logTo: AlogyLogDestination = AlogyLogDestination.LOCAL_STORAGE,
    private logGroup: number = 99,
  ) {
  }
  debug(message: string, code ?: number) {
    this._alogy.writeToLog(this.logTo, LogLevel.DEBUG, message, this.logGroup, code);
  }
  info(message: string, code ?: number) {
    this._alogy.writeToLog(this.logTo, LogLevel.INFO, message, this.logGroup, code);
  }
  warn(message: string, code ?: number) {
    this._alogy.writeToLog(this.logTo, LogLevel.WARN, message, this.logGroup, code);
  }
  error(message: string, code ?: number) {
    this._alogy.writeToLog(this.logTo, LogLevel.ERROR, message, this.logGroup, code);
  }
  exportToArray(): string[] {
    return this._alogy.localStorageLogChain.allEntries().map(entry => this._alogy.formatter.format(entry)); /** @todo implement this */
  }
}

export enum AlogyLogDestination {
  LOCAL_STORAGE, // LS -> CONSOLE
  GOOGLE_ANALYTICS // GA -> LS -> CONSOLE
}