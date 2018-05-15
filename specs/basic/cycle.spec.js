const iasync = require('../../build/index');

describe('until specs', () => {
    it('wrong condition', (done) => {
        iasync.cycle(0, value => value > 0, value => value + 1, () => {
            expect(true).toBe(false);
        }, () => {
            done();
        });
    });
    it('calls count', (done) => {
        let count = 0;
        const iterator = (value, callback) => {
            count += 1;
            callback();
        };
        iasync.cycle(0, value => value < 10, value => value + 1, iterator, () => {
            expect(count).toBe(10);
            done();
        });
    });
    it('async: calls count', (done) => {
        let count = 0;
        const iterator = async () => {
            count += 1;
        };
        iasync.cycle(0, value => value < 10, value => value + 1, iterator, () => {
            expect(count).toBe(10);
            done();
        });
    });
    it('async-promise: calls count', (done) => {
        let count = 0;
        const iterator = async () => {
            count += 1;
        };
        iasync.cycle(0, value => value < 10, value => value + 1, iterator).then(() => {
            expect(count).toBe(10);
            done();
        }, () => {
            expect(false).toBe(true);
            done();
        });
    });
    it('calls count with error', (done) => {
        let count = 0;
        const iterator = (value, callback) => {
            count += 1;
            callback(1);
        };
        iasync.cycle(0, value => value < 10, value => value + 1, iterator, (err) => {
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
        iasync.cycle(0, value => value < 10, value => value + 1, iterator, (err) => {
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
        iasync.cycle(0, value => value < 10, value => value + 1, iterator).then(() => {
            expect(false).toBe(true);
            done();
        }, (err) => {
            expect(count).toBe(1);
            expect(err).toBeDefined();
            done();
        });
    });
    it('calculate sum', (done) => {
        let sum = 0;
        const iterator = (value, callback) => {
            sum += value;
            callback();
        };
        iasync.cycle(0, value => value < 5, value => value + 1, iterator, () => {
            expect(sum).toBe(10);
            done();
        });
    });
    it('async: calculate sum', (done) => {
        let sum = 0;
        const iterator = async (value) => {
            sum += value;
        };
        iasync.cycle(0, value => value < 5, value => value + 1, iterator, () => {
            expect(sum).toBe(10);
            done();
        });
    });
    it('async-promise: calculate sum', (done) => {
        let sum = 0;
        const iterator = async (value) => {
            sum += value;
        };
        iasync.cycle(0, value => value < 5, value => value + 1, iterator).then(() => {
            expect(sum).toBe(10);
            done();
        }, () => {
            expect(false).toBe(true);
            done();
        });
    });
});

