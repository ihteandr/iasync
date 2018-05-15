import * as basicSet from './basic';
import * as parallelSet from './parallel';

export default {
    ...basicSet,
    parallel: {
        ...parallelSet,
    },
};
