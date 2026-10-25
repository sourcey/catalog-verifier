import { DIGEST_PATTERN, IDENTIFIER_PATTERN, SLUG_PATTERN } from "provenry/primitives";
import { z } from "zod";
import { AGENT_READINESS_PROFILE_ID_PATTERN, ENTITY_ID_PATTERN, OFFER_ID_PATTERN, } from "../../../modules/catalog-primitives/src/index.js";
export const agentReadinessDigestSchema = z.string().regex(DIGEST_PATTERN);
export const agentReadinessEntityIdSchema = z.string().regex(ENTITY_ID_PATTERN);
export const agentReadinessOfferIdSchema = z.string().regex(OFFER_ID_PATTERN);
export const agentReadinessProfileIdSchema = z.string().regex(AGENT_READINESS_PROFILE_ID_PATTERN);
export const agentReadinessIdentifierSchema = z.string().regex(IDENTIFIER_PATTERN);
export const agentReadinessInstantSchema = z.iso.datetime({ offset: true });
export const agentReadinessScopeKeySchema = z.string().regex(SLUG_PATTERN);
export const agentReadinessHostnameSchema = z
    .string()
    .trim()
    .toLowerCase()
    .max(253)
    .regex(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/u);
/** Whether a profile's last successful check is within the policy's freshness window. */
export const agentReadinessFreshnessSchema = z.enum(["fresh", "stale"]);
const agentReadinessScopeSubjectSchema = z
    .object({
    key: agentReadinessScopeKeySchema,
    name: z.string().min(1).max(160),
})
    .strict();
/** A profile is one service product and one library job: `job.key` is the job's id. */
export const agentReadinessScopeSchema = z
    .object({
    product: agentReadinessScopeSubjectSchema,
    job: agentReadinessScopeSubjectSchema,
})
    .strict();
export function sameAgentReadinessScopeIdentity(left, right) {
    return left.product.key === right.product.key && left.job.key === right.job.key;
}
/**
 * A URL's origin, or null for a value that is not a URL. A declaration's own
 * checks compare origins whatever its fields read, so a value its URL check
 * refused is reported there, never thrown on.
 */
export function agentReadinessUrlOrigin(value) {
    return URL.canParse(value) ? new URL(value).origin : null;
}
/** The value an RFC 6901 pointer names, or undefined. */
export function valueAtPointer(document, pointer) {
    if (pointer === "")
        return document;
    let value = document;
    for (const raw of pointer.slice(1).split("/")) {
        const token = raw.replaceAll("~1", "/").replaceAll("~0", "~");
        if (Array.isArray(value)) {
            if (!/^(?:0|[1-9][0-9]*)$/u.test(token))
                return undefined;
            value = value[Number(token)];
        }
        else if (value !== null && typeof value === "object" && Object.hasOwn(value, token)) {
            value = value[token];
        }
        else {
            return undefined;
        }
    }
    return value;
}
export const agentReadinessCatalogBindingSchema = z
    .object({
    base_release_id: agentReadinessDigestSchema,
    entity_revision_digest: agentReadinessDigestSchema,
})
    .strict();
export const agentReadinessResourceRoleSchema = z.enum([
    "discovery",
    "terms",
    "eligibility",
    "pricing",
    "access",
    "checkout",
    "provisioning",
    "operations",
    "recovery",
    "authentication",
    "descriptor",
    "documentation",
    "policy",
    "status",
]);
export const agentReadinessSurfaceNodeKindSchema = z.enum([
    "resource",
    "endpoint",
    "interface",
    "surface_exclusion",
]);
export const agentReadinessSurfaceReferenceSchema = z
    .object({
    node_kind: agentReadinessSurfaceNodeKindSchema,
    node_id: agentReadinessScopeKeySchema,
})
    .strict();
/**
 * The earlier runs of each group a refresh reads, newest first: the profile's
 * probe runs, and each binding's (north star §5.4).
 */
export const AGENT_READINESS_PRIOR_RUNS_READ = 4;
/** The most runs a policy asks to hold one finding before it counts (its reproduction's `attempts`). */
export const AGENT_READINESS_MAXIMUM_ATTEMPTS = 2;
/**
 * A revision rests on at most this many runs: its probe runs from the earliest
 * its grade rests on through the latest (the earlier ones a refresh reads, and
 * its own), and its binding's runs that decide.
 */
export const AGENT_READINESS_MAXIMUM_REVISION_RUNS = AGENT_READINESS_PRIOR_RUNS_READ + 1 + AGENT_READINESS_MAXIMUM_ATTEMPTS;
/**
 * The roles of the pages a person's or a vendor's step happens on, which a
 * listing names and the probe requests (north star §5.3).
 */
export const AGENT_READINESS_PAGE_ROLES = [
    "registration",
    "access_request",
    "access_setting",
    "claim",
    "checkout",
    "top_up",
    "key_renewal",
];
/** A probe run requests each declared page once, and a listing names at most this many. */
export const AGENT_READINESS_MAXIMUM_PAGES = 8;
/** A listing declares at most this many account operations (north star §5.6). */
export const AGENT_READINESS_MAXIMUM_ACCOUNT_OPERATIONS = 4;
/**
 * The most documents a spec's references reach in one run, beside the spec
 * itself, each read under the document bound (north star §5.6).
 */
export const AGENT_READINESS_MAXIMUM_REFERENCED_DOCUMENTS = 4;
/**
 * The path, in the shape's order: the agent finds the job, gets authority for
 * it, registers, pays, confirms, and keeps its access up (north star §5.1).
 */
export const AGENT_READINESS_STEPS = [
    "discover",
    "authority",
    "onboard",
    "pay",
    "confirm",
    "sustain",
];
export const agentReadinessStepSchema = z.enum(AGENT_READINESS_STEPS);
/**
 * What happened at one step (north star §5.2): done by the agent, absent
 * (nothing to do), a principal's one-time decision, a person doing the
 * agent's work, or a vendor's decision standing in the way. `not_assessed` is
 * a step a run did not settle; a published revision holds one only on an F
 * card whose listing names no interface for the job.
 */
export const agentReadinessStepOutcomeSchema = z.enum([
    "machine",
    "not_applicable",
    "approval",
    "workaround",
    "gated",
    "not_assessed",
]);
/**
 * The job itself, which is not a step (north star §5.1): an interface for it
 * answers, a fresh run did it, or no machine interface performs it (F).
 * `not_assessed` until the probes settle it.
 */
export const agentReadinessJobOutcomeSchema = z.enum([
    "reachable",
    "verified",
    "unavailable",
    "not_assessed",
]);
/** Once (per principal or credential lifetime), or every run, purchase or period. */
export const agentReadinessHumanStepTimingSchema = z.enum(["setup", "recurring"]);
/**
 * The kinds of person-step on the shape's scale (north star §5.7), lightest
 * first: a light, one-time step; a person signing up; a person handing over a
 * key; a card on file; a step that recurs; a vendor's decision.
 */
export const AGENT_READINESS_PERSON_STEP_KINDS = [
    "light",
    "sign_up",
    "key",
    "card",
    "recurring",
    "gated",
];
export const agentReadinessPersonStepKindSchema = z.enum(AGENT_READINESS_PERSON_STEP_KINDS);
/**
 * Every person-step a step can need (north star §5.7): the outcomes, besides
 * `machine`, `not_applicable` and `not_assessed`, that a step result may hold.
 */
export const AGENT_READINESS_PERSON_STEPS = [
    { step: "discover", outcome: "workaround", timing: "setup" },
    { step: "authority", outcome: "approval", timing: "setup" },
    { step: "authority", outcome: "workaround", timing: "setup" },
    { step: "onboard", outcome: "approval", timing: "setup" },
    { step: "onboard", outcome: "workaround", timing: "setup" },
    { step: "onboard", outcome: "gated", timing: null },
    { step: "pay", outcome: "workaround", timing: "setup" },
    { step: "pay", outcome: "workaround", timing: "recurring" },
    { step: "confirm", outcome: "workaround", timing: "recurring" },
    { step: "sustain", outcome: "workaround", timing: "setup" },
    { step: "sustain", outcome: "workaround", timing: "recurring" },
];
/** One person-step, keyed as `step:outcome:timing`. */
export function agentReadinessPersonStepKey(step) {
    return `${step.step}:${step.outcome}:${step.timing ?? "-"}`;
}
/** The scale, best first (north star §5.7). */
export const agentReadinessLetterSchema = z.enum(["A+", "A", "B+", "B", "C", "D", "F"]);
export const agentReadinessEvidenceLabelSchema = z.enum(["vendor_run_verified", "probed"]);
//# sourceMappingURL=shared.js.map