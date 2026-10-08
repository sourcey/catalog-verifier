import { type EvidenceAssertion } from "../../../contracts/evidence/src/index.js";
import type { CoverageRequirement } from "../../../contracts/policies/src/index.js";
interface EvidenceCoverageDiagnostic {
    readonly path: string;
    readonly status: "covered" | "uncovered";
    readonly proof_kinds: CoverageRequirement["proof_kinds"];
    readonly guidance: string;
}
/**
 * Policy roots describe material claims when the corresponding field is
 * present. Required revision fields are always applicable; optional public
 * facts enter the claim graph only when the revision publishes them.
 */
export declare function applicableEvidenceCoverageRequirements(content: unknown, requirements: readonly CoverageRequirement[]): CoverageRequirement[];
/**
 * Returns the smallest exact paths an extractor must consider to prove a
 * policy field. Objects expand to their complete leaf closure while ordinary
 * arrays remain atomic because evidence for one item cannot prove that a list
 * is exhaustive. Eligibility rule arrays are the exception: each declared
 * criterion is independently provable, so sources may compose the complete
 * rule set without any source claiming criteria it does not contain.
 */
export declare function evidenceCoverageCandidateRequirements(content: unknown, requirements: readonly CoverageRequirement[]): CoverageRequirement[];
/**
 * True when the asserted paths prove the whole required value: either an
 * assertion covers the value directly, or every child of an object is
 * covered. This lets independent captures compose without weakening any
 * individual assertion or changing the public coverage policy.
 */
export declare function evidenceRequirementIsCovered(content: unknown, requirement: CoverageRequirement, assertions: readonly EvidenceAssertion[]): boolean;
export declare function evaluateEvidenceCoverage(content: unknown, requirements: readonly CoverageRequirement[], assertions: readonly EvidenceAssertion[]): EvidenceCoverageDiagnostic[];
export declare function evidencePathsOverlap(left: string, right: string): boolean;
export declare function evidenceAssertionSatisfiesRequirement(assertion: EvidenceAssertion, requirement: CoverageRequirement): boolean;
export declare function valueAtEvidencePointer(value: unknown, pointer: string): unknown;
export {};
//# sourceMappingURL=evidence-coverage.d.ts.map