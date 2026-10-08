import { digest } from "provenry/primitives";
import { AGENT_READINESS_POLICY_CONTRACT, agentReadinessPolicyCoreSchema, agentReadinessPolicySchema, } from "../../../contracts/agent-readiness/src/operate-policy.js";
import { verifyAgentReadinessJobLibrary } from "../../agent-readiness-jobs/src/index.js";
const OPERATE_COVERAGE = ["delegation", "pay", "job", "confirm"];
/**
 * The rating policy's authored source (north star §3.6). Readers load the
 * content-addressed file generated from it and pinned by release
 * configuration, never this object.
 */
export function agentReadinessPolicySource(input) {
    return {
        policy_contract: AGENT_READINESS_POLICY_CONTRACT,
        policy_version: "operate-2026-10-06",
        job_library: verifyAgentReadinessJobLibrary(input.jobLibrary),
        letters: [
            {
                letter: "A+",
                condition: {
                    workarounds_allowed: false,
                    recurring_allowed_in: [],
                    recurring_required_in: null,
                    setup_workarounds: { minimum: 0, maximum: 0 },
                },
                coverage: ["discover", "delegation", "pay", "job", "confirm", "sustain"],
                statement: "Every step was assessed, and the agent or a legitimate decision by the principal did each one.",
            },
            {
                letter: "A",
                condition: {
                    workarounds_allowed: true,
                    recurring_allowed_in: [],
                    recurring_required_in: null,
                    setup_workarounds: { minimum: 0, maximum: 1 },
                },
                coverage: [...OPERATE_COVERAGE],
                statement: "No person is needed on any run; at most one person's setup step.",
            },
            {
                letter: "B+",
                condition: {
                    workarounds_allowed: true,
                    recurring_allowed_in: [],
                    recurring_required_in: null,
                    setup_workarounds: { minimum: 2, maximum: null },
                },
                coverage: [...OPERATE_COVERAGE],
                statement: "No person is needed on any run; two or more setup steps need a person.",
            },
            {
                letter: "B",
                condition: {
                    workarounds_allowed: true,
                    recurring_allowed_in: ["sustain"],
                    recurring_required_in: ["sustain"],
                    setup_workarounds: { minimum: 0, maximum: null },
                },
                coverage: [...OPERATE_COVERAGE, "sustain"],
                statement: "The job runs without a person, but a person must keep the credentials alive.",
            },
            {
                letter: "C+",
                condition: {
                    workarounds_allowed: true,
                    recurring_allowed_in: ["delegation", "pay", "sustain"],
                    recurring_required_in: ["delegation", "pay"],
                    setup_workarounds: { minimum: 0, maximum: null },
                },
                coverage: [...OPERATE_COVERAGE],
                statement: "A person must renew the agent's authority or payment over time.",
            },
            {
                letter: "C",
                condition: {
                    workarounds_allowed: true,
                    recurring_allowed_in: ["delegation", "pay", "job", "confirm", "sustain"],
                    recurring_required_in: ["job", "confirm"],
                    setup_workarounds: { minimum: 0, maximum: null },
                },
                coverage: ["delegation", "job", "confirm"],
                statement: "Each run needs a person to do the job or to tell success from failure.",
            },
        ],
        blocked: {
            attempts: 2,
            minimum_interval_seconds: 3_600,
            statuses: [402, 403],
            statements: {
                D: "The service reproducibly refuses delegated authority or payment for this job.",
                F: "No machine interface performs this job under delegated authority.",
            },
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
//# sourceMappingURL=operate-policy.js.map