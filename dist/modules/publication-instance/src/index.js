import { contentAddressedArchiveDelivery } from "provenry/publication/delivery";
import { createPublicationEnvelope } from "provenry/publication/envelope";
import { readReleaseFiles } from "provenry/publication/objects";
import { SOURCEY_ARTIFACT_ORIGIN } from "../../../contracts/artifact/src/distribution.js";
import { catalogReleaseDeliverySchema, sourceyReleaseEnvelopeSchemas, } from "../../../contracts/release/src/index.js";
import { sourceyReleaseOwnership } from "../../../contracts/sourcey-publication/src/ownership.js";
/** The domain transition a delta release carries beside its envelope. */
export const SOURCEY_DELTA_STATE_FILE = "delta.json";
/**
 * Sourcey's installed release envelope: the engine's layout and checks, Sourcey's
 * signed contract identifiers and the objects each Sourcey adapter owns. A delta
 * release carries its domain transition as a state file; a full release has none.
 */
export const sourceyReleaseEnvelope = createPublicationEnvelope({
    schemas: sourceyReleaseEnvelopeSchemas,
    ownership: sourceyReleaseOwnership,
    stateFiles: [SOURCEY_DELTA_STATE_FILE],
});
/** Reads a materialized release once and verifies its envelope once. */
export async function readVerifiedSourceyRelease(directory) {
    const envelope = sourceyReleaseEnvelope.verify(await readReleaseFiles(directory));
    const delta = envelope.stateFiles.get(SOURCEY_DELTA_STATE_FILE);
    return delta ? { kind: "delta", envelope, delta } : { kind: "full", envelope };
}
/** Where Sourcey delivers release archives; contributor data cannot select it. */
const sourceyReleaseDelivery = {
    artifactOrigin: SOURCEY_ARTIFACT_ORIGIN,
    collectionPath: "catalog/releases",
    archiveNamePrefix: "sourcey-catalog-release",
};
export function catalogReleaseDelivery(bundleDigest) {
    return catalogReleaseDeliverySchema.parse(contentAddressedArchiveDelivery({ bundleDigest, ...sourceyReleaseDelivery }));
}
//# sourceMappingURL=index.js.map