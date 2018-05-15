const iasync = require('../../build/index');

describe('parallel call amount spec', () => {
    it('0 amount', (done) => {
        iasync.parallel.callAmount(10)(0, () => {
            expect(false).toBe(true);
        }, () => {
            done();
        });
    });
    it('check calls amount', (done) => {
        let count = 0;
        iasync.parallel.callAmount(10)(20, (num, callback) => {
            count += 1;
            callback();
        }, () => {
            expect(count).toBe(20);
            done();
        });
    });
    it('async: check calls amount', (done) => {
        let count = 0;
        iasync.parallel.callAmount(10)(20, async () => {
            count += 1;
        }, () => {
            expect(count).toBe(20);
            done();
        });
    });
    it('async-promise: check calls amount', (done) => {
        let count = 0;
        iasync.parallel.callAmount(10)(20, async () => {
            count += 1;
        }).then(() => {
            expect(count).toBe(20);
            done();
        }, () => {
            expect(false).toBe(true);
            done();
        });
    });
    it('calculate sum', (done) => {
        let sum = 0;
        iasync.parallel.callAmount(10)(5, (num, callback) => {
            sum += num;
            callback();
        }, () => {
            expect(sum).toBe(10);
            done();
        });
    });
    it('async: calculate sum', (done) => {
        let sum = 0;
        iasync.parallel.callAmount(10)(5, async (num) => {
            sum += num;
        }, () => {
            expect(sum).toBe(10);
            done();
        });
    });
    it('async-promise: calculate sum', (done) => {
        let sum = 0;
        iasync.parallel.callAmount(10)(5, async (num) => {
            sum += num;
        }).then(() => {
            expect(sum).toBe(10);
            done();
        }, () => {
            expect(false).toBe(true);
            done();
        });
    });
});
