'use strict';

const mockery = require('mockery');


// Set up mockery
beforeEach(() => {
  mockery.enable({
    useCleanCache: true,
    warnOnUnregistered: false,
  });
});

afterEach(() => {
  mockery.disable();
});
