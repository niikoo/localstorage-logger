# ng-alogy

[^alogy, alogia; In medicine: An inabillity to speak]: alogy. (n.d.) -Ologies &amp; -Isms. (2008). Retrieved August 4 2017 from http://www.thefreedictionary.com/alogy

If you, in fact, can not talk - then you 'have' to write!

**Logging is for you!**

------

Logging library for writing to and exporting from local storage. Can also be used to log to Google Analytics, the console, and it's expandable.

Made for Angular 4+ compatibility. Maintained by niikoo for use with: 

[EXPOSER PLAYER]: https//www.exposer.no	"by Destinet (https://www.destinet.no), in Norwegian."

## What is it?

This JavaScript library provides a mechanism to log to local storage and export the most recent entries. It will overwrite the oldest entries when writing a new entry if adding the entry makes the log bigger than `maxLogSizeInBytes`.

## Installation

```
npm install --save ng-alogy
```

## Usage

This is how you can use the logging functionality:

```
import createLog from 'ng-alogy';

const log = createLog({
  logName: 'my-app-log-name',
  maxLogSizeInBytes: 500 * 1024 // 500KB
});

// Log something
// debug | info | warn | error
log.info('something', {
  foo: 'bar'
}, 42);

// Export the log entries
const logEntries = log.exportToArray();
```
