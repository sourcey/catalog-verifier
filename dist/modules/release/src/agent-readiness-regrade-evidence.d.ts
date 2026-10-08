import { z } from "zod";
import { type AgentReadinessDeclarationRevision, type AgentReadinessDeltaObject, type AgentReadinessPolicy, type AgentReadinessProjection, type AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import type { SignerRegistry } from "../../../contracts/authority/src/index.js";
import { type CatalogEvent } from "../../../contracts/events/src/index.js";
import type { EntityRevision } from "../../../contracts/revisions/src/index.js";
import { type EventGraph } from "../../provenance/src/index.js";
export declare const AGENT_READINESS_REGRADE_EVIDENCE_PREFIX = "agent-readiness-regrade-evidence/";
/**
 * Exact standing context for reprojection of an existing revision: the events
 * its dispute and attestation state rest on. New events still require ordinary
 * release admission; these bytes only close the graph beside the prior
 * projection for independent offline recomputation. Ratings rest on the
 * revision's own steps and need no evidence here.
 */
export declare const agentReadinessRegradeEvidenceSchema: z.ZodObject<{
    evidence_contract: z.ZodLiteral<"sourcey.agent-readiness-regrade-evidence/v1alpha1">;
    agent_readiness_profile_id: z.ZodString;
    revision_digest: z.ZodString;
    events: z.ZodArray<z.ZodObject<{
        event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
        kind: z.ZodEnum<{
            "agent-readiness-profile.admitted": "agent-readiness-profile.admitted";
            "agent-readiness-profile.merged": "agent-readiness-profile.merged";
            "agent-readiness-profile.reparented": "agent-readiness-profile.reparented";
            "agent-readiness-profile.retired": "agent-readiness-profile.retired";
            "asset.bound": "asset.bound";
            "asset.takedown-ordered": "asset.takedown-ordered";
            "asset.withdrawn": "asset.withdrawn";
            "assurance.revoked": "assurance.revoked";
            "attestation.revoked": "attestation.revoked";
            "authority.claimed": "authority.claimed";
            "authority.rechecked": "authority.rechecked";
            "authority.revoked": "authority.revoked";
            "authority.superseded": "authority.superseded";
            "discrepancy.resolved": "discrepancy.resolved";
            "dispute.opened": "dispute.opened";
            "dispute.resolved": "dispute.resolved";
            "entity.identity-checked": "entity.identity-checked";
            "entity.merged": "entity.merged";
            "entity.split": "entity.split";
            "entity.succeeded": "entity.succeeded";
            "evidence.bound": "evidence.bound";
            "evidence.retracted": "evidence.retracted";
            "freshness.exception-granted": "freshness.exception-granted";
            "freshness.exception-revoked": "freshness.exception-revoked";
            "identity.transition-superseded": "identity.transition-superseded";
            "offer.merged": "offer.merged";
            "offer.reparented": "offer.reparented";
            "offer.retired": "offer.retired";
            "offer.terms-checked": "offer.terms-checked";
            "program.merged": "program.merged";
            "program.reparented": "program.reparented";
            "program.retired": "program.retired";
            "subject.attested": "subject.attested";
            "verification.completed": "verification.completed";
        }>;
        issuer_id: z.ZodString;
        operation_id: z.ZodString;
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            subject_type: z.ZodLiteral<"entity">;
            entity_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"agent_readiness_profile">;
            entity_id: z.ZodString;
            agent_readiness_profile_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"program">;
            entity_id: z.ZodString;
            program_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            subject_type: z.ZodLiteral<"offer">;
            entity_id: z.ZodString;
            program_id: z.ZodOptional<z.ZodString>;
            offer_id: z.ZodString;
            revision_digest: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>], "subject_type">;
        occurred_at: z.ZodISODateTime;
        payload: z.ZodUnknown;
        event_id: z.ZodString;
        protected: z.ZodObject<{
            signature_purpose: z.ZodEnum<{
                "catalog-attestation": "catalog-attestation";
                "catalog-authority": "catalog-authority";
                "catalog-dispute": "catalog-dispute";
                "catalog-evidence": "catalog-evidence";
                "catalog-feed": "catalog-feed";
                "catalog-identity": "catalog-identity";
                "catalog-policy": "catalog-policy";
                "catalog-release": "catalog-release";
                "catalog-verification": "catalog-verification";
            }>;
            signer_registry_digest: z.ZodString;
            key_id: z.ZodString;
            algorithm: z.ZodLiteral<"ed25519">;
            signature: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type AgentReadinessRegradeEvidence = z.infer<typeof agentReadinessRegradeEvidenceSchema>;
/**
 * Select the changed events owned by one exact Agent Readiness revision.
 * A Catalog delta is not a complete event graph: unrelated transitions may
 * target immutable objects retained by the parent release.
 */
export declare function selectAgentReadinessEvidenceChanges(input: {
    readonly profileId: string;
    readonly revisionDigest: string;
    readonly events: readonly CatalogEvent[];
}): readonly CatalogEvent[];
/**
 * Select, from the resolved closure, exactly the events one regrade is
 * projected from: the prior projection's basis events, every event on the same
 * revision, and every event that invalidates one of those.
 */
export declare function selectAgentReadinessRegradeEvidence(input: {
    readonly profileId: string;
    readonly revision: AgentReadinessRevision;
    readonly priorProjection: AgentReadinessProjection;
    readonly events: readonly CatalogEvent[];
}): AgentReadinessRegradeEvidence;
/** The evidence must close the prior projection exactly before it can rebuild its graph. */
export declare function verifyAgentReadinessRegradeEvidence(input: {
    readonly evidence: AgentReadinessRegradeEvidence;
    readonly revision: AgentReadinessRevision;
    readonly priorProjection: AgentReadinessProjection;
}): EventGraph;
/**
 * Read one shipped regrade evidence file. Retained evidence re-verifies every
 * event signature against the release-pinned registry at this release's
 * sequence; it admits nothing and carries no inclusion record.
 */
export declare function readAgentReadinessRegradeEvidenceFile(input: {
    readonly path: string;
    readonly bytes: Buffer;
    readonly registries: ReadonlyMap<string, SignerRegistry>;
    readonly releaseSequence: number;
}): readonly [string, AgentReadinessRegradeEvidence];
/** Every shipped evidence file must belong to exactly one policy regrade object. */
export declare function assertAgentReadinessRegradeEvidenceClosure(evidence: ReadonlyMap<string, AgentReadinessRegradeEvidence>, objects: ReadonlyMap<string, AgentReadinessDeltaObject>): void;
/** The canonical projection a policy-only regrade object must equal. */
export declare function expectedAgentReadinessRegradeProjection(input: {
    readonly profileId: string;
    readonly object: AgentReadinessDeltaObject;
    readonly current: AgentReadinessProjection;
    readonly revision: AgentReadinessRevision;
    readonly declarationRevision: AgentReadinessDeclarationRevision;
    readonly entityRevision: EntityRevision;
    readonly entitySlug: string;
    readonly evidence: AgentReadinessRegradeEvidence | undefined;
    /** The delta's own events on this revision. */
    readonly deltaEvents: readonly CatalogEvent[];
    readonly policy: AgentReadinessPolicy;
    readonly policyAsOf: string;
}): AgentReadinessProjection;
//# sourceMappingURL=agent-readiness-regrade-evidence.d.ts.map