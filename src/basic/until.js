import { onlyOnce, makeAsync, preventWhenError, promisify } from '../helpers';

export function until(condition, iterator, cb) {
    return promisify(cb, (callback) => {
        const _callback = onlyOnce(makeAsync(callback));
        const _iterator = makeAsync(iterator);
        if (condition()) {
            _iterator(preventWhenError(_callback, () => {
                until(condition, iterator, callback);
            }));
        } else {
            _callback();
        }
    });
}
