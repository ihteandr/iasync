export function makeAsync(fn) {
    return (...args) => {
        if (fn.constructor.name === 'AsyncFunction') {
            const callback = args.pop();
            fn.apply(this, args).then((arg) => {
                callback(null, arg);
            }, callback);
        } else {
            setTimeout(() => {
                fn.apply(this, args);
            }, 0);
        }
    };
}
