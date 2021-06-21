const isObject = (item) => {
    return item != null && typeof(item) === 'object' && !Array.isArray(item);
}

export const mergePatch = (target, patch) => {
    if (!isObject(patch)) {
        return patch;
    }

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
};

export const generatePatch = (source, target) => {
    if (!isObject(source) || !isObject(target)) {
        if (source === target) {
            return null;
        }
        return target;
    }

    const patch = {};
    for (const [name, value] of Object.entries(source)) {
        if (!(name in target)) {
            patch[name] = null;
        } else {
            if (isObject(source[name]) && isObject(target[name])) {
                const ret = generatePatch(source[name], target[name]);
                if (ret !== null) {
                    patch[name] = ret;
                }
            } else if (source[name] !== target[name]) {
                patch[name] = target[name];
            }
        }
    }
    for (const [name, value] of Object.entries(target)) {
        if (!(name in source)) {
            patch[name] = value;
        }
    }

    return patch;
};
