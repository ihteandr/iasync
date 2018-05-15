const iasync = require('../../build/index');

describe('reduce specs', () => {
    it('empty array', (done) => {
        iasync.reduce([], 0, () => {
            expect(true).toBe(false);
        }, () => {
            done();
        });
    });
    it('calls count', (done) => {
        let count = 0;
        const iterator = (value, memo, callback) => {
            count += 1;
            callback();
        };
        iasync.reduce([1, 2, 3], 0, iterator, () => {
            expect(count).toBe(3);
            done();
        });
    });
    it('async: calls count', (done) => {
        let count = 0;
        const iterator = async () => {
            count += 1;
        };
        iasync.reduce([1, 2, 3], 0, iterator, () => {
            expect(count).toBe(3);
            done();
        });
    });
    it('async-promise: calls count', (done) => {
        let count = 0;
        const iterator = async () => {
            count += 1;
        };
        iasync.reduce([1, 2, 3], 0, iterator).then(() => {
            expect(count).toBe(3);
            done();
        }, () => {
            expect(false).toBe(true);
            done();
        });
    });
    it('calls count with error', (done) => {
        let count = 0;
        const iterator = (value, memo, callback) => {
            count += 1;
            callback('error');
        };
        iasync.reduce([1, 2, 3], 0, iterator, (err) => {
            expect(count).toBe(1);
            expect(err).toBeDefined();
            done();
        });
    });
    it('async: calls count with error', (done) => {
        let count = 0;
        const iterator = async () => {
            count += 1;
            throw new Error('error');
        };
        iasync.reduce([1, 2, 3], 0, iterator, (err) => {
            expect(count).toBe(1);
            expect(err).toBeDefined();
            done();
        });
    });
    it('async-promise: calls count with error', (done) => {
        let count = 0;
        const iterator = async () => {
            count += 1;
            throw new Error('error');
        };
        iasync.reduce([1, 2, 3], 0, iterator).then(() => {
            expect(false).toBe(true);
            done();
        }, (err) => {
            expect(count).toBe(1);
            expect(err).toBeDefined();
            done();
        });
    });
    it('calculate sum', (done) => {
        const iterator = (value, memo, callback) => {
            callback(null, value + memo);
        };
        iasync.reduce([1, 2, 3, 4], 0, iterator, (err, sum) => {
            expect(sum).toBe(10);
            done();
        });
    });
    it('async: calculate sum', (done) => {
        const iterator = async (value, memo) => value + memo;
        iasync.reduce([1, 2, 3, 4], 0, iterator, (err, sum) => {
            expect(sum).toBe(10);
            done();
        });
    });
    it('async-promise: calculate sum', (done) => {
        const iterator = async (value, memo) => value + memo;
        iasync.reduce([1, 2, 3, 4], 0, iterator).then((sum) => {
            expect(sum).toBe(10);
            done();
        }, () => {
            expect(false).toBe(true);
            done();
        });
    });
});

