import { onlyOnce, makeAsync, preventWhenError, promisify } from '../helpers';

export function reduce(list, memo, iterator, cb) {
    return promisify(cb, (callback) => {
        const _callback = onlyOnce(makeAsync(callback));
        const _iterator = makeAsync(iterator);
        let index = 0;
        const checkNext = (currentMemo) => {
            if (index < list.length) {
                _iterator(list[index], currentMemo, localeCallback);
                index++;
            } else {
                _callback(null, currentMemo);
            }
        };
        const localeCallback = preventWhenError(_callback, checkNext);
        checkNext(memo);
    });
}
