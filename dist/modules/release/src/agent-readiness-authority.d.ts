import { type Digest } from "provenry/primitives";
import { type AgentReadinessAuthorityBundleManifest, type AgentReadinessPolicy, type AgentReadinessProfileReleaseInput } from "../../../contracts/agent-readiness/src/index.js";
import type { SignerRegistry } from "../../../contracts/authority/src/index.js";
import { type CatalogEvent, type CatalogEventIntent } from "../../../contracts/events/src/index.js";
import type { EvidenceAuthorityEventSigner } from "../../evidence-operations/src/evidence-authority-materialization.js";
import { type LoadedAgentReadinessProfile } from "./inputs.js";
/**
 * The event that admits one revision: the automatic lane's decision that the
 * engine derived these ratings from exactly this input under this policy.
 */
export declare function agentReadinessAdmissionIntent(input: {
    readonly releaseInput: AgentReadinessProfileReleaseInput;
    readonly policy: AgentReadinessPolicy;
    readonly issuerId: string;
    readonly operationId: string;
    readonly admittedAt: string;
}): CatalogEventIntent;
/**
 * A delta's new readiness input stands only on its one signed admission: an
 * event among the delta's own that is exactly what this release input earns
 * under this policy.
 */
export declare function assertAgentReadinessAdmitted(input: {
    readonly events: readonly CatalogEvent[];
    readonly releaseInput: AgentReadinessProfileReleaseInput;
    readonly policy: AgentReadinessPolicy;
}): void;
/**
 * Admit one verified revision as release authority: its ratings are
 * re-derived under the policy, the admission is signed by the evidence
 * issuer, and the bundle carries exactly the public release input and that
 * event.
 */
export declare function materializeAgentReadinessAuthority(input: {
    readonly releaseInput: AgentReadinessProfileReleaseInput;
    readonly policy: AgentReadinessPolicy;
    readonly issuerId: string;
    readonly operationId: string;
    readonly admittedAt: string;
    readonly signer: EvidenceAuthorityEventSigner;
    readonly targetRegistry: SignerRegistry;
    readonly releaseSequence: number;
}): Promise<{
    readonly manifest: AgentReadinessAuthorityBundleManifest;
    readonly files: ReadonlyMap<string, Buffer>;
    readonly event: CatalogEvent;
}>;
interface ReadAgentReadinessAuthorityBundle {
    readonly manifest: AgentReadinessAuthorityBundleManifest;
    readonly releaseInput: AgentReadinessProfileReleaseInput;
    readonly event: CatalogEvent;
}
/** A bundle's exact bytes, each object matching its manifest and the manifest its digest. */
export declare function readAgentReadinessAuthorityBundle(root: string): Promise<ReadAgentReadinessAuthorityBundle>;
/**
 * Admit a bundle into a release: its event is signed for this registry and is
 * exactly the admission its release input earns under the target policy, and
 * the engine re-derives every rating from the run records.
 */
export declare function admitAgentReadinessAuthorityBundle(input: {
    readonly bundle: ReadAgentReadinessAuthorityBundle;
    readonly policy: AgentReadinessPolicy;
    readonly targetRegistry: SignerRegistry;
    readonly targetReleaseSequence: number;
}): {
    readonly bundleDigest: Digest;
    readonly profile: LoadedAgentReadinessProfile;
    readonly events: readonly CatalogEvent[];
};
export {};
//# sourceMappingURL=agent-readiness-authority.d.ts.map