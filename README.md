# ng-alogy

[^**alogy, alogia; In medicine: An inabillity to speak**]: alogy. (n.d.) -Ologies &amp; -Isms. (2008). Retrieved August 4 2017 from http://www.thefreedictionary.com/alogy

If you, in fact, can not speak - then you 'have' to write!

**Logging is for you!**

------

Logging library for writing to and exporting from local storage. Can also be used to log to Google Analytics, the console, and it's expandable.

Made for Angular 4+ compatibility. Maintained by niikoo for use with: 

[EXPOSER PLAYER]: https//www.exposer.no	"by Destinet (https://www.destinet.no), in Norwegian."

## What is it?

This TypeScript library for Angular 4+ provides a mechanism to log to local storage and export the most recent entries. It will overwrite the oldest entries when writing a new entry if adding the entry makes the log bigger than `maxLogSizeInBytes`.

## Installation

```
npm install --save ng-alogy
```

## Usage

This is how you can use the logging functionality:

Add the module in `app-module.ts` or another module to use it as injectable service.

This example is based on that:

```typescript
import { Injectable } from '@angular/core';
import { Alogy } from 'ng-alogy';

@Injectable()
export class LogService {
  constructor(
  	private _alogy: Alogy
  ) {
    this._alogy.create(
      AlogyLogDestination.LOCAL_STORAGE,
      <ILocalStorageLoggerConfiguration>{
        logName: 'testLog', // Log name
        maxLogSizeInBytes: 2^20 // Log size - in bytes
    });
  }
  
  /**
   * Logging interface, logging in a specific logging group.
   * 
   * @param {number} logGroup The log group ID number (for example: 3 or 5)
   * @returns 
   * @memberof LogService
   */
  getLoggingInterface(logGroup: number) : ILog {
    return this._alogy.getLogAPI(
      logGroup,
      AlogyLogDestination.LOCAL_STORAGE
    );
  }
}
```

Then, from whatever component or service you'd like:

```typescript
import { LogService } from './log.service'
import { ILog } from 'ng-alogy';

export class Example {
  private _log: ILog;
  constructor(
  	private _logService: LogService
  ) {
    this.log = this._logService.getLoggingInterface(15); //15 as an example group
  }

  isItTrue(test:boolean):void {
    if(test) {
      this._log.info('it is true');
    } else {
      this._log.error('it is not true');
    }
  }
}

```

