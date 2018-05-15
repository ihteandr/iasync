import * as basicSet from './basic';
import * as parallelSet from './parallel';

const iasync = {
    ...basicSet,
    parallel: {
        ...parallelSet,
    },
};
if (module !== undefined && module.exports !== undefined) {
    module.exports = iasync;
}
export default iasync;
