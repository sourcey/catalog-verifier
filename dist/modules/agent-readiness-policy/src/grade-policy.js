import { digest } from "provenry/primitives";
import { AGENT_READINESS_POLICY_CONTRACT, agentReadinessPolicyCoreSchema, agentReadinessPolicySchema, } from "../../../contracts/agent-readiness/src/grade-policy.js";
import { verifyAgentReadinessJobLibrary } from "../../agent-readiness-jobs/src/index.js";
/**
 * The rating policy's authored source (north star §5.7). Readers load the
 * content-addressed file generated from it and pinned by release
 * configuration, never this object.
 */
export function agentReadinessPolicySource(input) {
    const allows = (overrides) => ({
        approvals: null,
        setup_workarounds: null,
        recurring_workarounds: false,
        gated: false,
        unavailable: false,
        ...overrides,
    });
    return {
        policy_contract: AGENT_READINESS_POLICY_CONTRACT,
        policy_version: "grade-2026-10-11",
        job_library: verifyAgentReadinessJobLibrary(input.jobLibrary),
        letters: [
            {
                letter: "A+",
                allows: allows({ approvals: 0, setup_workarounds: 0 }),
                statement: "An agent gets in, pays and keeps going with no person.",
            },
            {
                letter: "A",
                allows: allows({ approvals: 1, setup_workarounds: 0 }),
                statement: "One light, one-time decision by a person, such as consenting to the agent's own client or claiming the account it made.",
            },
            {
                letter: "B+",
                allows: allows({ setup_workarounds: 2 }),
                statement: "A person sets up at most two things once, such as signing up and handing over a key, or decides more than once.",
            },
            {
                letter: "B",
                allows: allows({}),
                statement: "A person sets up three or more things once, such as signing up, handing over a key and putting a card on file.",
            },
            {
                letter: "C",
                allows: allows({ recurring_workarounds: true }),
                statement: "A person is needed again and again: to renew access, top up, or check that the job worked.",
            },
            {
                letter: "D",
                allows: allows({ recurring_workarounds: true, gated: true }),
                statement: "Access is the vendor's decision: sales or approval.",
            },
            {
                letter: "F",
                allows: allows({ recurring_workarounds: true, gated: true, unavailable: true }),
                statement: "No machine interface performs the job.",
            },
        ],
        reproduction: {
            attempts: 2,
            minimum_interval_seconds: 3_600,
            statuses: [403],
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