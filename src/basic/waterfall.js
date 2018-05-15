import { onlyOnce, makeAsync, preventWhenError, promisify } from '../helpers';

export function waterwall(list, cb) {
    return promisify(cb, (callback) => {
        const _callback = onlyOnce(makeAsync(callback));
        let index = 0;
        const checkNext = (...args) => {
            if (index < list.length) {
                makeAsync(list[index]).apply(this, args.concat([localeCallback]));
                index++;
            } else {
                _callback.apply(this, [null].concat(args));
            }
        };
        const localeCallback = preventWhenError(_callback, checkNext);
        checkNext();
    });
}
