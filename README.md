# Mocha Repeater

## Overview
This project purpose is to provide helper methods for mocha.

## How to use

```
const repeat = require('mocha-repeater');
repeat.describe({name: 'test', repeat: 2, fn: function () {
    before(...
    beforeEach(...
    it(...
    describe(...
        it(...
    after(...
    afterEach(...
}})

repeat.describe({isOnly: true, name: test, repeat: 2, fn: function () {
    ...
}})

repeat.describe({isSkip: true, name: test, repeat: 2, fn: function () {
    ...
}})

describe('test', function () {
    repeat.it(... //see options above, same as repeat.describe
})
```
