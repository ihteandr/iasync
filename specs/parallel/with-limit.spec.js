const iasync = require('../../build/index').default;

describe('parallel withLimit spec', () => {
    it('empty array', (done) => {
        iasync.parallel.withLimit(10, false)([], (error, result) => {
            expect(error).toBeUndefined();
            expect(result).toBeUndefined();
            done();
        });
    });
    it('check result', (done) => {
        iasync.parallel.withLimit(10, true)([
            callback => callback(null, 1),
            callback => callback(null, 2),
        ], (error, result) => {
            expect(error).toBeUndefined();
            expect(result.length).toBe(2);
            expect(result.join()).toBe([1, 2].join());
            done();
        });
    });
    it('async: check result', (done) => {
        iasync.parallel.withLimit(10, true)([
            async () => 1,
            async () => 2,
        ], (error, result) => {
            expect(error).toBeUndefined();
            expect(result.length).toBe(2);
            expect(result.join()).toBe([1, 2].join());
            done();
        });
    });
    it('async-promise: check result', (done) => {
        iasync.parallel.withLimit(10, true)([
            async () => 1,
            async () => 2,
        ]).then((result) => {
            expect(result.length).toBe(2);
            expect(result.join()).toBe([1, 2].join());
            done();
        }, () => {
            expect(false).toBe(true);
            done();
        });
    });
    it('check result as a object', (done) => {
        iasync.parallel.withLimit(10, true)({
            a: callback => callback(null, 'a'),
            b: callback => callback(null, 'b'),
        }, (error, result) => {
            expect(error).toBeUndefined();
            expect(JSON.stringify(result)).toBe(JSON.stringify({ a: 'a', b: 'b' }));
            done();
        });
    });
    it('async: check result as a object', (done) => {
        iasync.parallel.withLimit(10, true)({
            a: async () => 'a',
            b: async () => 'b',
        }, (error, result) => {
            expect(error).toBeUndefined();
            expect(JSON.stringify(result)).toBe(JSON.stringify({ a: 'a', b: 'b' }));
            done();
        });
    });
    it('async-promise: check result as a object', (done) => {
        iasync.parallel.withLimit(10, true)({
            a: async () => 'a',
            b: async () => 'b',
        }).then((result) => {
            expect(JSON.stringify(result)).toBe(JSON.stringify({ a: 'a', b: 'b' }));
            done();
        }, () => {
            expect(false).toBe(true);
            done();
        });
    });
});
