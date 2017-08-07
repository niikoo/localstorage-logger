var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
export { LimitedSizeQueue } from './queue/LimitedSizeQueue';
import { ConsoleLogger } from './loggers/ConsoleLogger';
export { LocalStorageLogger } from './loggers/LocalStorageLogger';
export { ConsoleLogger } from './loggers/ConsoleLogger';
export { NullLogger } from './loggers/NullLogger';
export { DefaultFormatter } from './formatters/DefaultFormatter';
import { Injectable } from '@angular/core';
import { LogLevel } from './core/LogLevel';
import { GoogleAnalyticsLogger } from './loggers/GoogleAnalyticsLogger';
import { LocalStorageLogger } from './loggers/LocalStorageLogger';
import { DefaultFormatter } from './formatters/DefaultFormatter';
import { NullLogger } from './loggers/NullLogger';
var Alogy = (function () {
    function Alogy() {
        this._timestampProvider = function () { return new Date; };
    }
    /**
     * Set up Alogy - Global config
     *
     *
     *
     * @param {AlogyLogDestination[]} [logTo=[AlogyLogDestination.LOCAL_STORAGE]] Set this to ´GOOGLE_ANALYTICS´ to have that as upper layer, if ´LOCAL_STORAGE´, analytics is not used.
     * @param {ILocalStorageLoggerConfiguration} config Local storage config
     * @memberof Alogy
     */
    Alogy.prototype.create = function (logTo, config) {
        if (logTo === void 0) { logTo = AlogyLogDestination.LOCAL_STORAGE; }
        this.formatter = new DefaultFormatter();
        // Chain of responsibility style pattern here...
        this.chainTerminal = new NullLogger();
        this.consoleLogChain = new ConsoleLogger(this.formatter, this.chainTerminal);
        this.localStorageLogChain = new LocalStorageLogger(config, this.consoleLogChain);
        this.googleAnalyticsLogChain = new GoogleAnalyticsLogger(this.formatter, this.localStorageLogChain); //(config, this.localStorageLogChain);
    };
    Alogy.prototype.getLogAPI = function (logGroup, logTo) {
        if (logTo === void 0) { logTo = AlogyLogDestination.LOCAL_STORAGE; }
        return new LogAPI(this, logTo, logGroup);
    };
    Alogy.prototype.writeToLog = function (logTo, level, message, logCodeGroup, code) {
        var time = this._timestampProvider().toISOString();
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
                    level: level, time: time, message: message
                });
                break;
        }
    };
    return Alogy;
}());
Alogy = __decorate([
    Injectable()
], Alogy);
export { Alogy };
var LogAPI = (function () {
    function LogAPI(_alogy, logTo, logGroup) {
        if (logTo === void 0) { logTo = AlogyLogDestination.LOCAL_STORAGE; }
        if (logGroup === void 0) { logGroup = 99; }
        this._alogy = _alogy;
        this.logTo = logTo;
        this.logGroup = logGroup;
    }
    LogAPI.prototype.debug = function (message, code) {
        this._alogy.writeToLog(this.logTo, LogLevel.DEBUG, message, this.logGroup, code);
    };
    LogAPI.prototype.info = function (message, code) {
        this._alogy.writeToLog(this.logTo, LogLevel.INFO, message, this.logGroup, code);
    };
    LogAPI.prototype.warn = function (message, code) {
        this._alogy.writeToLog(this.logTo, LogLevel.WARN, message, this.logGroup, code);
    };
    LogAPI.prototype.error = function (message, code) {
        this._alogy.writeToLog(this.logTo, LogLevel.ERROR, message, this.logGroup, code);
    };
    LogAPI.prototype.exportToArray = function () {
        var _this = this;
        return this._alogy.localStorageLogChain.allEntries().map(function (entry) { return _this._alogy.formatter.format(entry); }); /** @todo implement this */
    };
    return LogAPI;
}());
export { LogAPI };
export var AlogyLogDestination;
(function (AlogyLogDestination) {
    AlogyLogDestination[AlogyLogDestination["LOCAL_STORAGE"] = 0] = "LOCAL_STORAGE";
    AlogyLogDestination[AlogyLogDestination["GOOGLE_ANALYTICS"] = 1] = "GOOGLE_ANALYTICS"; // GA -> LS -> CONSOLE
})(AlogyLogDestination || (AlogyLogDestination = {}));
//# sourceMappingURL=index.js.map