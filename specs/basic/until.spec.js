const iasync = require('../../build/index').default;

describe('until specs', () => {
    it('wrong condition', (done) => {
        iasync.until(() => false, () => {
            expect(true).toBe(false);
        }, () => {
            done();
        });
    });
    it('calls count', (done) => {
        let count = 0;
        const iterator = (callback) => {
            count += 1;
            callback();
        };
        iasync.until(() => count < 10, iterator, () => {
            expect(count).toBe(10);
            done();
        });
    });
    it('async: calls count', (done) => {
        let count = 0;
        const iterator = async () => {
            count += 1;
        };
        iasync.until(() => count < 10, iterator, () => {
            expect(count).toBe(10);
            done();
        });
    });
    it('async-promise: calls count', (done) => {
        let count = 0;
        const iterator = async () => {
            count += 1;
        };
        iasync.until(() => count < 10, iterator).then(() => {
            expect(count).toBe(10);
            done();
        }, () => {
            expect(false).toBe(true);
            done();
        });
    });
    it('calls count with error', (done) => {
        let count = 0;
        const iterator = (callback) => {
            count += 1;
            callback('error');
        };
        iasync.until(() => count < 10, iterator, (err) => {
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
        iasync.until(() => count < 10, iterator, (err) => {
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
        iasync.until(() => count < 10, iterator)
            .then(() => {
                expect(false).toBe(true);
                done();
            }, () => {
                expect(count).toBe(1);
                done();
            });
    });
});
