export function preventWhenError(callback, fn) {
    let _fn = fn;
    const _callback = callback;
    return (err, ...args) => {
        if (err !== undefined && err !== null) {
            _fn = null;
            _callback.isGetError = true;
            return _callback(err);
        }
        if (!_fn) {
            return null;
        }
        return _fn.apply(this, args);
    };
}
