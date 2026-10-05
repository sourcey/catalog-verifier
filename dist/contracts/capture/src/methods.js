import { createCaptureMethodRegistry, createCaptureMethodRegistryDirectory, } from "provenry/capture/methods";
import { sourceyEvidenceCaptureMethodNames, sourceyEvidenceCaptureMethodVersion, } from "./method-names.js";
const sourceyCaptureMethodCapabilities = {
    http: ["live-source"],
    headless: ["live-source", "rendered-page"],
    archive: ["history-only"],
    manual: ["manual-review"],
};
export const sourceyCaptureMethodRegistry = createCaptureMethodRegistry(sourceyEvidenceCaptureMethodNames.map((name) => ({
    name,
    version: sourceyEvidenceCaptureMethodVersion,
    capabilities: sourceyCaptureMethodCapabilities[name],
})));
/** Append prior installed registries here when Sourcey adds capture methods. */
export const sourceyCaptureMethodRegistryDirectory = createCaptureMethodRegistryDirectory([
    sourceyCaptureMethodRegistry,
]);
//# sourceMappingURL=methods.js.map