import { onlyOnce, makeAsync, preventWhenError, promisify } from '../helpers';

export function withLimit(limit, withResult = false) {
    return (list, cb) => promisify(cb, (callback) => {
        const _callback = onlyOnce(makeAsync(callback));
        const result = Array.isArray(list) ? [] : {};
        const keys = Object.keys(list);
        let running = 0;
        let index = 0;
        if (keys.length === 0) {
            _callback(undefined, withResult ? result : undefined);
        }
        const callNext = () => {
            if (index === keys.length && running === 0) {
                _callback(undefined, withResult ? result : undefined);
            } else if (index < keys.length && !_callback.isGetError) {
                makeAsync(list[keys[index]])(getLocaleCallback(index));
                running++;
                index++;
            }
        };
        const getLocaleCallback = currentIndex => preventWhenError(_callback, (value) => {
            if (withResult) {
                result[keys[currentIndex]] = value;
            }
            running--;
            callNext();
        });
        while (index < keys.length && running < limit) {
            callNext();
        }
    });
}
