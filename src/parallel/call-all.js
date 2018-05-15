import { withLimit } from './with-limit';

export function callAll(list, callback) {
    return withLimit(Object.keys(list).length, true)(list, callback);
}
