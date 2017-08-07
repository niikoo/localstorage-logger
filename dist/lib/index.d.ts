export { IQueueConfiguration } from './queue/IQueueConfiguration';
export { LimitedSizeQueue } from './queue/LimitedSizeQueue';
export { ILocalStorageLoggerConfiguration } from './loggers/ILocalStorageLoggerConfiguration';
export { LocalStorageLogger } from './loggers/LocalStorageLogger';
export { ConsoleLogger } from './loggers/ConsoleLogger';
export { NullLogger } from './loggers/NullLogger';
export { ILog } from './ILog';
export { DefaultFormatter } from './formatters/DefaultFormatter';
import { ILocalStorageLoggerConfiguration } from './loggers/ILocalStorageLoggerConfiguration';
import { ILog } from './ILog';
import { LogLevel } from './core/LogLevel';
import { LocalStorageLogger } from './loggers/LocalStorageLogger';
import { DefaultFormatter } from './formatters/DefaultFormatter';
export declare class Alogy {
    private _alogy;
    formatter: DefaultFormatter;
    private chainTerminal;
    private consoleLogChain;
    localStorageLogChain: LocalStorageLogger;
    private googleAnalyticsLogChain;
    private _timestampProvider;
    /**
     * Set up Alogy - Global config
     *
     *
     *
     * @param {AlogyLogDestination[]} [logTo=[AlogyLogDestination.LOCAL_STORAGE]] Set this to ´GOOGLE_ANALYTICS´ to have that as upper layer, if ´LOCAL_STORAGE´, analytics is not used.
     * @param {ILocalStorageLoggerConfiguration} config Local storage config
     * @memberof Alogy
     */
    create(logTo: AlogyLogDestination | undefined, config: ILocalStorageLoggerConfiguration): void;
    getLogAPI(logGroup: number, logTo?: AlogyLogDestination): LogAPI;
    writeToLog(logTo: AlogyLogDestination, level: LogLevel, message: string, logCodeGroup: number, code?: number): void;
}
export declare class LogAPI implements ILog {
    private _alogy;
    private logTo;
    private logGroup;
    constructor(_alogy: Alogy, logTo?: AlogyLogDestination, logGroup?: number);
    debug(message: string, code?: number): void;
    info(message: string, code?: number): void;
    warn(message: string, code?: number): void;
    error(message: string, code?: number): void;
    exportToArray(): string[];
}
export declare enum AlogyLogDestination {
    LOCAL_STORAGE = 0,
    GOOGLE_ANALYTICS = 1,
}
