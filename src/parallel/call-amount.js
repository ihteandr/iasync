import { onlyOnce, makeAsync, preventWhenError, promisify } from '../helpers';

export function callAmount(amount) {
    return (limit, iterator, cb) => promisify(cb, (callback) => {
        const _callback = onlyOnce(makeAsync(callback));
        const _iterator = makeAsync(iterator);
        let running = 0;
        let _amount = amount;
        if (_amount === 0) {
            _callback();
        }
        const callNext = () => {
            if (_amount === 0 && running === 0) {
                _callback();
            } else if (_amount !== 0 && !_callback.isGetError) {
                _iterator(amount - _amount, localeCallback);
                running++;
                _amount--;
            }
        };
        const localeCallback = preventWhenError(_callback, () => {
            running--;
            callNext();
        });
        while (running < limit && _amount > 0) {
            callNext();
        }
    });
}
