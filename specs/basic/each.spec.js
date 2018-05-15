const iasync = require('../../build/index').default;

describe('each specs', () => {
    it('empty array', (done) => {
        iasync.each([], () => {
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
        iasync.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], iterator, () => {
            expect(count).toBe(10);
            done();
        });
    });
    it('async: calls count', (done) => {
        let count = 0;
        const iterator = async () => {
            count += 1;
        };
        iasync.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], iterator, () => {
            expect(count).toBe(10);
            done();
        });
    });
    it('async-promise: calls count', (done) => {
        let count = 0;
        const iterator = async () => {
            count += 1;
        };
        iasync.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], iterator).then(() => {
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
            callback('error');
        };
        iasync.each([1, 2, 3, 4], iterator, (err) => {
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
        iasync.each([1, 2, 3, 4], iterator, (err) => {
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
        iasync.each([1, 2, 3, 4], iterator).then(() => {
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
        iasync.each([1, 2, 3, 4], iterator, () => {
            expect(sum).toBe(10);
            done();
        });
    });
    it('async: calculate sum', (done) => {
        let sum = 0;
        const iterator = async (value) => {
            sum += value;
        };
        iasync.each([1, 2, 3, 4], iterator, () => {
            expect(sum).toBe(10);
            done();
        });
    });
});

