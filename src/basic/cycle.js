import { onlyOnce, makeAsync, preventWhenError, promisify } from '../helpers';

export function cycle(value, condition, endAction, iterator, cb) {
    return promisify(cb, (callback) => {
        const _callback = onlyOnce(makeAsync(callback));
        const _iterator = makeAsync(iterator);
        if (condition(value)) {
            _iterator(value, preventWhenError(_callback, () => {
                cycle(endAction(value), condition, endAction, iterator, callback);
            }));
        } else {
            _callback();
        }
    });
}
