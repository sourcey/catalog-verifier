import { digest } from "provenry/primitives";
import { AGENT_READINESS_POLICY_CONTRACT, agentReadinessPolicyCoreSchema, agentReadinessPolicySchema, } from "../../../contracts/agent-readiness/src/grade-policy.js";
import { verifyAgentReadinessJobLibrary } from "../../agent-readiness-jobs/src/index.js";
/**
 * The rating policy's authored source (north star §5.7). Readers load the
 * content-addressed file generated from it and pinned by release
 * configuration, never this object.
 */
export function agentReadinessPolicySource(input) {
    return {
        policy_contract: AGENT_READINESS_POLICY_CONTRACT,
        policy_version: "kind-2026-10-12.2",
        job_library: verifyAgentReadinessJobLibrary(input.jobLibrary),
        // The kind of each person-step (north star §5.7), in the shape's words where it names one.
        person_steps: [
            // Not named by the shape: a person tells the agent where the interface is (north star §11).
            { step: "discover", outcome: "workaround", timing: "setup", kind: "light" },
            // "OAuth consent with a self-registering client".
            { step: "authority", outcome: "approval", timing: "setup", kind: "light" },
            // "hands over a key".
            { step: "authority", outcome: "workaround", timing: "setup", kind: "key" },
            // "claiming the account later"; confirming a registration or turning access on, once.
            { step: "onboard", outcome: "approval", timing: "setup", kind: "light" },
            // "a person signs up".
            { step: "onboard", outcome: "workaround", timing: "setup", kind: "sign_up" },
            // "access depends on sales or approval".
            { step: "onboard", outcome: "gated", timing: null, kind: "gated" },
            // "a card on file".
            { step: "pay", outcome: "workaround", timing: "setup", kind: "card" },
            // "manual top-ups".
            { step: "pay", outcome: "workaround", timing: "recurring", kind: "recurring" },
            // Not named by the shape: untyped errors, a person checks each failure (north star §11).
            { step: "confirm", outcome: "workaround", timing: "recurring", kind: "recurring" },
            // Not named by the shape: a person replaces a key that never expires (north star §11).
            { step: "sustain", outcome: "workaround", timing: "setup", kind: "light" },
            // "keys that expire with no renewal API".
            { step: "sustain", outcome: "workaround", timing: "recurring", kind: "recurring" },
        ],
        letters: [
            {
                letter: "A+",
                allows: { kinds: [], most_steps: 0, unavailable: false },
                statement: "An agent gets in, pays and recovers with no person: anonymous, pay-per-call or agent registration.",
            },
            {
                letter: "A",
                // "one light, one-time human step": one person-step at most.
                allows: { kinds: ["light"], most_steps: 1, unavailable: false },
                statement: "One light, one-time human step: OAuth consent with the agent's own client, or claiming the account later.",
            },
            {
                letter: "B+",
                allows: { kinds: ["light", "sign_up", "key"], most_steps: null, unavailable: false },
                statement: "A person signs up and hands over a key.",
            },
            {
                letter: "B",
                allows: {
                    kinds: ["light", "sign_up", "key", "card"],
                    most_steps: null,
                    unavailable: false,
                },
                statement: "A card on file.",
            },
            {
                letter: "C",
                allows: {
                    kinds: ["light", "sign_up", "key", "card", "recurring"],
                    most_steps: null,
                    unavailable: false,
                },
                statement: "Human steps that recur, such as manual top-ups or keys that expire with no renewal API.",
            },
            {
                letter: "D",
                allows: {
                    kinds: ["light", "sign_up", "key", "card", "recurring", "gated"],
                    most_steps: null,
                    unavailable: false,
                },
                statement: "Access depends on sales or approval.",
            },
            {
                letter: "F",
                allows: {
                    kinds: ["light", "sign_up", "key", "card", "recurring", "gated"],
                    most_steps: null,
                    unavailable: true,
                },
                statement: "No machine interface for the job.",
            },
        ],
        reproduction: {
            attempts: 2,
            minimum_interval_seconds: 3_600,
        },
        fresh_for_days: 30,
    };
}
/** The policy with its digest, checked as every reader checks it. */
export function sealAgentReadinessPolicy(source) {
    const core = agentReadinessPolicyCoreSchema.parse(source);
    return agentReadinessPolicySchema.parse({ ...core, policy_digest: digest(core) });
}
/** A published policy, only when its digest and its job library's digest close their content. */
export function verifyAgentReadinessPolicy(value) {
    const policy = agentReadinessPolicySchema.parse(value);
    const { policy_digest, ...core } = policy;
    if (digest(agentReadinessPolicyCoreSchema.parse(core)) !== policy_digest) {
        throw new Error("Agent Readiness policy digest does not match its content.");
    }
    verifyAgentReadinessJobLibrary(policy.job_library);
    return policy;
}
//# sourceMappingURL=grade-policy.js.map