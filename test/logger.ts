/// <reference path="../lib/all.d.ts" />

import {ILog} from '../lib/ILog';
import { Alogy, AlogyLogDestination} from '../lib/index';

// Make sure full diffs are shown
(<any> chai).config.truncateThreshold = 0;

let expect = chai.expect;

describe('Local storage logger', function() {
  const MAX_SIZE_IN_BYTES = 10000
  const LOG_NAME = 'test-log';
  const now = new Date();
  const nowFormatted = now.toISOString();
  let _alogy: Alogy;
  let sut: ILog;
  
  beforeEach(() => {
    localStorage.clear();
    _alogy = new Alogy();
    _alogy.create(
      AlogyLogDestination.LOCAL_STORAGE,
      {
      logName: LOG_NAME,
      maxLogSizeInBytes: MAX_SIZE_IN_BYTES
    });
  });
  
  it('should be possible to export formatted log entries', () => {
    // Arrange
    sut.debug('my debug', 12);
    sut.info('my info', 34);
    sut.warn('my warn', 56);
    sut.error('my error', 78);
    // Act
    const exportedEntries = _alogy.exportToStringArray();
    // Assert
    expect(exportedEntries).to.deep.equal([
      `[${nowFormatted}] [DEBUG] "my debug",12`,
      `[${nowFormatted}] [INFO] "my info",34`,
      `[${nowFormatted}] [WARN] "my warn",56`,
      `[${nowFormatted}] [ERROR] "my error",78`
    ]);
  });

  // TODO:
  // it('should log to console', () => {...})
});
