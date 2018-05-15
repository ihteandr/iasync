export function promisify(callback, fn) {
    if (!callback) {
        return new Promise((resolve, reject) => {
            fn((err, arg) => {
                if (err) {
                    return reject(err);
                }
                return resolve(arg);
            });
        });
    }
    return fn(callback);
}
