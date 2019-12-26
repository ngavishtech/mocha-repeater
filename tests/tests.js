let {expect} = require('chai'),
    sinon = require('sinon');
require('chai').use(require('sinon-chai'));

let repeat = require('../index');

describe('describe-repeater', function () {
    let call;
    describe('describe', function () {
        before(function () {
            call = sinon.spy();
            repeat.origin_describe = sinon.spy(repeat.origin_describe);
            repeat.describe({name: 'name', repeat: 2, fn: call});
        });
        after(function () {
            sinon.restore();
            repeat.origin_describe = global.describe;
        });

        it('delegates to describe() twice', function () {
            expect(call.callCount).equal(2);
            expect(repeat.origin_describe).calledWithMatch('name (iteration 1-2)');
            expect(repeat.origin_describe).calledWithMatch('name (iteration 2-2)');
        });
    });
    describe('describe skip', function () {
        before(function () {
            call = sinon.spy();
            repeat.describe({name: 'name', repeat: 1, fn: function() {
                if (this.pending)
                    call();
            }});
            repeat.describe({isSkip: true, name: 'name2', repeat: 2, fn: function() {
                if (this.pending)
                    call();
            }});
            repeat.describe({isSkip: false, name: 'name3', repeat: 1, fn: function() {
                if (this.pending)
                    call();
            }});
        });
        after(function () {
            sinon.restore();
        });

        it('delegates to describe() twice', function () {
            expect(call.callCount).equal(2);
        });
    });
});
describe('it-repeater', function () {
    let call;
    describe('it', function () {
        before(function () {
            call = sinon.spy();
        });
        after(function () {
            sinon.restore();
        });

        repeat.it({name: 'name', repeat: 2, fn: function() {
            call();
        }});
        it('delegates to it() twice', function () {
            expect(call.callCount).equal(2);
        });
    });
    describe('it skip', function () {
        before(function () {
            call = sinon.spy();
        });
        after(function () {
            sinon.restore();
        });

        repeat.it({isSkip: true, name: 'name', repeat: 1, fn: function() {
            call();
        }});
        repeat.it({isSkip: false, name: 'name2', repeat: 1, fn: function() {
            call();
        }});
        repeat.it({name: 'name3', repeat: 1, fn: function() {
            call();
        }});
        it('delegates to it() twice', function () {
            expect(call.callCount).equal(2);
        });
    });
});