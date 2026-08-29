import { resolve } from "node:path";
/**
 * Argument reading for distribution executables. A CLI module owns only its own
 * flags; the generated root shim owns every process concern, so nothing here
 * touches argv, stdout, or the exit code.
 */
export function flag(args, name) {
    return flags(args, name)[0];
}
export function flags(args, name) {
    const values = [];
    for (let index = 0; index < args.length; index += 1) {
        if (args[index] !== name)
            continue;
        const value = args[index + 1];
        if (!value || value.startsWith("--"))
            throw new Error(`${name} requires a value.`);
        values.push(value);
    }
    return values;
}
export function requiredFlag(args, name) {
    const value = flag(args, name);
    if (!value)
        throw new Error(`${name} is required.`);
    return value;
}
export function requiredPath(args, name) {
    return resolve(requiredFlag(args, name));
}
//# sourceMappingURL=index.js.map