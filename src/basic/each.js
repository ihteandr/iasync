import { onlyOnce, makeAsync, preventWhenError, promisify } from '../helpers';

export function each(list, iterator, cb) {
    return promisify(cb, (callback) => {
        const _callback = onlyOnce(makeAsync(callback));
        const _iterator = makeAsync(iterator);
        let index = 0;
        const checkNext = () => {
            if (index < list.length) {
                _iterator(list[index], localeCallback);
                index++;
            } else {
                _callback();
            }
        };
        const localeCallback = preventWhenError(_callback, checkNext);
        checkNext();
    });
}
