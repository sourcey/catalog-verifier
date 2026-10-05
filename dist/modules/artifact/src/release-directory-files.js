import { basename } from "node:path";
import { digestFromPathSegment } from "provenry/primitives";
import { releaseCaptureObjectPath, releaseNormalizedObjectPath, } from "../../../contracts/release/src/index.js";
/** How errors name the file set of one Catalog release. */
export const CATALOG_RELEASE = "Catalog release";
export function addressFromReleaseJsonPath(path) {
    return digestFromPathSegment(basename(path, ".json"));
}
/**
 * The public evidence bytes a verified release carries for its observations. The
 * envelope proved every file against its declaration, so a declared digest equal
 * to the object's address proves the bytes without hashing them again.
 */
export function releasedEvidenceObjects(observations, files, declarations) {
    const captures = new Map();
    const normalizedObjects = new Map();
    const collect = (objects, objectDigest, path) => {
        const bytes = files.get(path);
        if (bytes && declarations[path]?.sha256 === objectDigest)
            objects.set(objectDigest, bytes);
    };
    for (const observation of observations) {
        if (observation.capture?.availability !== "public")
            continue;
        const captureDigest = observation.capture.digest;
        collect(captures, captureDigest, releaseCaptureObjectPath(captureDigest));
        const normalizedDigest = observation.capture.normalized_object?.digest;
        if (normalizedDigest) {
            collect(normalizedObjects, normalizedDigest, releaseNormalizedObjectPath(normalizedDigest));
        }
    }
    return { captures, normalizedObjects };
}
//# sourceMappingURL=release-directory-files.js.map