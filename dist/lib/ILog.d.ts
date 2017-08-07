/**
 * Allows logging and exporting of the log.
 */
export interface ILog {
    debug(message: string, code?: number): void;
    info(message: string, code?: number): void;
    warn(message: string, code?: number): void;
    error(message: string, code?: number): void;
}
