import { LimitedSizeQueue } from '../queue/LimitedSizeQueue';
/**
 * Logger that logs to a queue in local storage. Will overwrite oldest entries
 * when desired size is exceeded.
 */
export class LocalStorageLogger {
    /**
       * Constructs a new local storage logger.
       * @param config The configuration defining the unique queue name, desired size etc.
       * @param _nextLogger The next logger in the "log chain"
       */
    constructor(config, _nextLogger) {
        this._nextLogger = _nextLogger;
        this._queue = new LimitedSizeQueue({
            keyPrefix: config.logName,
            maxSizeInBytes: config.maxLogSizeInBytes
        });
    }
    /**
       * Logs an entry to local storage.
       */
    log(entry) {
        try {
            this._queue.enqueue(entry);
        }
        catch (error) {
            console.error('Failed to log to local storage.', error);
        }
        finally {
            this._nextLogger.log(entry);
        }
    }
    /**
       * Returns all log entries that are still held in local storage.
       */
    allEntries() {
        const entries = new Array();
        this._queue.iterate(entry => entries.push(entry));
        return entries;
    }
}
//# sourceMappingURL=LocalStorageLogger.js.map