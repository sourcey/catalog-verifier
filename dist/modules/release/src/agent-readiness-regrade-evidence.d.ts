import { z } from "zod";
import { type AgentReadinessDeclarationRevision, type AgentReadinessDeltaObject, type AgentReadinessPolicy, type AgentReadinessProjection, type AgentReadinessRevision } from "../../../contracts/agent-readiness/src/index.js";
import type { SignerRegistry } from "../../../contracts/authority/src/index.js";
import { type CatalogEvent } from "../../../contracts/events/src/index.js";
import { type Observation } from "../../../contracts/observations/src/index.js";
import type { FreshnessPolicy } from "../../../contracts/policies/src/index.js";
import type { EntityRevision } from "../../../contracts/revisions/src/index.js";
import { type EventGraph } from "../../provenance/src/index.js";
export declare const AGENT_READINESS_REGRADE_EVIDENCE_PREFIX = "agent-readiness-regrade-evidence/";
/**
 * Exact evidence context for reprojection of an existing revision. New events
 * still require ordinary release admission; these bytes only close the graph
 * beside the prior projection for independent offline recomputation.
 */
export declare const agentReadinessRegradeEvidenceSchema: z.ZodObject<{
    evidence_contract: z.ZodLiteral<"sourcey.agent-readiness-regrade-evidence/v1alpha1">;
    agent_readiness_profile_id: z.ZodString;
    revision_digest: z.ZodString;
    events: z.ZodArray<z.ZodObject<{
        event_contract: z.ZodLiteral<"sourcey.catalog-event/v1alpha1">;
        kind: z.ZodEnum<{
            "program.retired": "program.retired";
            "offer.retired": "offer.retired";
            "asset.bound": "asset.bound";
            "asset.withdrawn": "asset.withdrawn";
            "evidence.bound": "evidence.bound";
            "evidence.retracted": "evidence.retracted";
            "discrepancy.resolved": "discrepancy.resolved";
            "authority.claimed": "authority.claimed";
            "authority.rechecked": "authority.rechecked";
            "authority.revoked": "authority.revoked";
            "authority.superseded": "authority.superseded";
            "subject.attested": "subject.attested";
            "attestation.revoked": "attestation.revoked";
            "verification.completed": "verification.completed";
            "entity.identity-checked": "entity.identity-checked";
            "offer.terms-checked": "offer.terms-checked";
            "assurance.revoked": "assurance.revoked";
            "freshness.exception-granted": "freshness.exception-granted";
            "freshness.exception-revoked": "freshness.exception-revoked";
            "dispute.opened": "dispute.opened";
            "dispute.resolved": "dispute.resolved";
            "asset.takedown-ordered": "asset.takedown-ordered";
            "entity.merged": "entity.merged";
            "entity.split": "entity.split";
            "entity.succeeded": "entity.succeeded";
            "offer.merged": "offer.merged";
            "program.merged": "program.merged";
            "program.reparented": "program.reparented";
            "offer.reparented": "offer.reparented";
            "agent-readiness-profile.merged": "agent-readiness-profile.merged";
            "agent-readiness-profile.reparented": "agent-readiness-profile.reparented";
            "agent-readiness-profile.retired": "agent-readiness-profile.retired";
            "identity.transition-superseded": "identity.transition-superseded";
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
                "catalog-capture": "catalog-capture";
                "catalog-evidence": "catalog-evidence";
                "catalog-identity": "catalog-identity";
                "catalog-authority": "catalog-authority";
                "catalog-attestation": "catalog-attestation";
                "catalog-verification": "catalog-verification";
                "catalog-dispute": "catalog-dispute";
                "catalog-policy": "catalog-policy";
                "catalog-release": "catalog-release";
                "catalog-feed": "catalog-feed";
            }>;
            signer_registry_digest: z.ZodString;
            key_id: z.ZodString;
            algorithm: z.ZodLiteral<"ed25519">;
            signature: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>>;
    observations: z.ZodArray<z.ZodObject<{
        observation_contract: z.ZodLiteral<"sourcey.observation/v1alpha1">;
        source_id: z.ZodString;
        source_uri: z.ZodURL;
        retrieved_at: z.ZodISODateTime;
        method: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
        }, z.core.$strict>;
        outcome: z.ZodEnum<{
            error: "error";
            "supports-candidate": "supports-candidate";
            "contradicts-candidate": "contradicts-candidate";
            unreachable: "unreachable";
        }>;
        capture: z.ZodOptional<z.ZodObject<{
            digest: z.ZodString;
            bytes: z.ZodNumber;
            media_type: z.ZodString;
            availability: z.ZodEnum<{
                public: "public";
                "private-receipt": "private-receipt";
            }>;
            requested_uri: z.ZodOptional<z.ZodURL>;
            final_uri: z.ZodOptional<z.ZodURL>;
            redirect_chain: z.ZodOptional<z.ZodArray<z.ZodObject<{
                status: z.ZodUnion<readonly [z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<307>, z.ZodLiteral<308>]>;
                from: z.ZodURL;
                to: z.ZodURL;
            }, z.core.$strict>>>;
            source_standing: z.ZodOptional<z.ZodEnum<{
                "live-first-party": "live-first-party";
                "archived-first-party": "archived-first-party";
                "live-third-party": "live-third-party";
                "archived-third-party": "archived-third-party";
                "manual-first-party": "manual-first-party";
                "manual-third-party": "manual-third-party";
            }>>;
            normalized_object: z.ZodOptional<z.ZodObject<{
                digest: z.ZodString;
                bytes: z.ZodNumber;
                media_type: z.ZodLiteral<"text/plain; charset=utf-8">;
                normalizer_contract: z.ZodLiteral<"sourcey.evidence-normalizer/v1alpha1">;
                normalizer_id: z.ZodString;
                version: z.ZodString;
                toolchain_digest: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        no_capture_reason: z.ZodOptional<z.ZodEnum<{
            "dns-failure": "dns-failure";
            "connect-timeout": "connect-timeout";
            "tls-failure": "tls-failure";
            "access-denied": "access-denied";
            "policy-blocked": "policy-blocked";
            "empty-response": "empty-response";
            "extractor-error": "extractor-error";
        }>>;
        observation_id: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type AgentReadinessRegradeEvidence = z.infer<typeof agentReadinessRegradeEvidenceSchema>;
export interface AgentReadinessEvidenceChanges {
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
}
/**
 * Select the changed evidence owned by one exact Agent Readiness revision.
 * A Catalog delta is not a complete event graph: unrelated transitions may
 * target immutable objects retained by the parent release.
 */
export declare function selectAgentReadinessEvidenceChanges(input: {
    readonly profileId: string;
    readonly revisionDigest: string;
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
}): AgentReadinessEvidenceChanges;
/**
 * Select, from the resolved closure, exactly the events and observations one
 * regrade is projected from: the prior projection's basis events, every event
 * on the same revision, and every event that invalidates one of those.
 */
export declare function selectAgentReadinessRegradeEvidence(input: {
    readonly profileId: string;
    readonly revision: AgentReadinessRevision;
    readonly priorProjection: AgentReadinessProjection;
    readonly events: readonly CatalogEvent[];
    readonly observations: readonly Observation[];
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
    readonly registry: SignerRegistry;
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
    readonly deltaEvidence: AgentReadinessEvidenceChanges;
    readonly policy: AgentReadinessPolicy;
    readonly policyAsOf: string;
    readonly freshnessPolicy: FreshnessPolicy;
}): AgentReadinessProjection;
//# sourceMappingURL=agent-readiness-regrade-evidence.d.ts.map