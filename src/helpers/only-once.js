export function onlyOnce(fn) {
    let localeFn = fn;
    return (...args) => {
        if (!localeFn) return;
        localeFn.apply(this, args);
        localeFn = null;
    };
}
