const iasync = require('../../build/index').default;

describe('waterwall specs', () => {
    it('empty array', (done) => {
        iasync.waterwall([], () => {
            done();
        });
    });
    it('calls count', (done) => {
        let count = 0;
        const iterator = (callback) => {
            count += 1;
            callback();
        };
        iasync.waterwall([
            iterator,
            iterator,
            iterator,
        ], () => {
            expect(count).toBe(3);
            done();
        });
    });
    it('async: calls count', (done) => {
        let count = 0;
        const iterator = async () => {
            count += 1;
        };
        iasync.waterwall([
            iterator,
            iterator,
            iterator,
        ], () => {
            expect(count).toBe(3);
            done();
        });
    });
    it('async-promise: calls count', (done) => {
        let count = 0;
        const iterator = async () => {
            count += 1;
        };
        iasync.waterwall([
            iterator,
            iterator,
            iterator,
        ]).then(() => {
            expect(count).toBe(3);
            done();
        });
    });
    it('calls count with error', (done) => {
        let count = 0;
        const iterator = (callback) => {
            count += 1;
            callback('error');
        };
        iasync.waterwall([
            iterator,
            iterator,
        ], (err) => {
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
        iasync.waterwall([
            iterator,
            iterator,
        ], (err) => {
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
        iasync.waterwall([
            iterator,
            iterator,
        ]).then(() => {
            expect(false).toBe(true);
            done();
        }, (err) => {
            expect(count).toBe(1);
            expect(err).toBeDefined();
            done();
        });
    });
    it('check arguments', (done) => {
        iasync.waterwall([
            (callback) => {
                callback(null, 5);
            },
            (value, callback) => {
                callback(null, value + 5);
            },
        ], (err, sum) => {
            expect(sum).toBe(10);
            done();
        });
    });
    it('async: check arguments', (done) => {
        iasync.waterwall([
            async () => 5,
            async value => value + 5,
        ], (err, sum) => {
            expect(sum).toBe(10);
            done();
        });
    });
    it('async-promise: check arguments', (done) => {
        iasync.waterwall([
            async () => 5,
            async value => value + 5,
        ]).then((sum) => {
            expect(sum).toBe(10);
            done();
        }, () => {
            expect(false).toBe(true);
            done();
        });
    });
});

