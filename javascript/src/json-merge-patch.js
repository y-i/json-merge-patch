const isObject = (item) => {
    return item != null && typeof(item) === 'object' && !Array.isArray(item);
}

export const mergePatch = (target, patch) => {
    if (isObject(patch)) {
        if (!isObject(target)) {
            target = {};
        }
        for (const [name, value] of Object.entries(patch)) {
            if (value === null) {
                if (name in target) {
                    delete target[name];
                }
            } else {
                target[name] = mergePatch(target[name], value);
            }
        }
        return target;
    } else {
        return patch;
    }
};

export const generatePatch = (source, target) => {
    const patch = {};

    return patch;
};