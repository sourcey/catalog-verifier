import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);
export const PARSE5_VERSION = installedPackageVersion("parse5");
function installedPackageVersion(packageName) {
    const entryPath = require.resolve(packageName);
    const packagePath = join(dirname(entryPath), "..", "package.json");
    const metadata = JSON.parse(readFileSync(packagePath, "utf8"));
    if (metadata.name !== packageName ||
        typeof metadata.version !== "string" ||
        !/^[0-9]+\.[0-9]+\.[0-9]+(?:[-+][0-9A-Za-z.-]+)?$/.test(metadata.version)) {
        throw new Error(`Installed ${packageName} package metadata is invalid.`);
    }
    return metadata.version;
}
//# sourceMappingURL=dependency-versions.js.map