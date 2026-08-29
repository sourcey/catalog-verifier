import { EVIDENCE_DERIVATION_RULE_PATHS, } from "../../../contracts/evidence/src/index.js";
import { compareCanonicalStrings } from "../../primitives/src/index.js";
/**
 * Policy roots describe material claims when the corresponding field is
 * present. Required revision fields are always applicable; optional public
 * facts enter the claim graph only when the revision publishes them.
 */
export function applicableEvidenceCoverageRequirements(content, requirements) {
    return requirements.filter((requirement) => pointerExists(content, requirement.path));
}
/**
 * Returns the smallest exact paths an extractor must consider to prove a
 * policy field. Objects expand to their complete leaf closure while ordinary
 * arrays remain atomic because evidence for one item cannot prove that a list
 * is exhaustive. Eligibility rule arrays are the exception: each declared
 * criterion is independently provable, so sources may compose the complete
 * rule set without any source claiming criteria it does not contain.
 */
export function evidenceCoverageCandidateRequirements(content, requirements) {
    const candidates = [];
    for (const requirement of applicableEvidenceCoverageRequirements(content, requirements)) {
        const paths = new Set();
        collectCoveragePaths(content, requirement.path, paths);
        candidates.push(...[...paths].map((path) => ({ ...requirement, path })));
    }
    return candidates.sort((left, right) => compareCanonicalStrings(left.path, right.path));
}
/**
 * True when the asserted paths prove the whole required value: either an
 * assertion covers the value directly, or every child of an object is
 * covered. This lets independent captures compose without weakening any
 * individual assertion or changing the public coverage policy.
 */
export function evidenceRequirementIsCovered(content, requirement, assertions) {
    if (pathOrAncestorHasAcceptedAssertion(requirement, assertions))
        return true;
    const value = valueAtEvidencePointer(content, requirement.path);
    const children = evidenceCoverageChildren(value, requirement.path);
    return (children.length > 0 &&
        children.every((path) => evidenceRequirementIsCovered(content, { ...requirement, path }, assertions)));
}
export function evaluateEvidenceCoverage(content, requirements, assertions) {
    return applicableEvidenceCoverageRequirements(content, requirements).map((requirement) => ({
        path: requirement.path,
        status: evidenceRequirementIsCovered(content, requirement, assertions)
            ? "covered"
            : "uncovered",
        proof_kinds: requirement.proof_kinds,
        guidance: requirement.guidance,
    }));
}
export function evidencePathsOverlap(left, right) {
    return left === right || left.startsWith(`${right}/`) || right.startsWith(`${left}/`);
}
export function evidenceAssertionSatisfiesRequirement(assertion, requirement) {
    return (assertion.polarity === "supports" &&
        requirement.proof_kinds.includes(assertion.proof_kind) &&
        (assertion.proof_kind !== "derived" ||
            (assertion.derivation_rule !== null &&
                assertion.path === EVIDENCE_DERIVATION_RULE_PATHS[assertion.derivation_rule] &&
                requirement.derivation_rules.includes(assertion.derivation_rule))));
}
function collectCoveragePaths(content, path, paths) {
    const value = valueAtEvidencePointer(content, path);
    const children = evidenceCoverageChildren(value, path);
    if (children.length === 0) {
        paths.add(path);
        return;
    }
    for (const child of children)
        collectCoveragePaths(content, child, paths);
}
function pathOrAncestorHasAcceptedAssertion(requirement, assertions) {
    let candidate = requirement.path;
    while (candidate.length > 0) {
        if (assertions.some((assertion) => assertion.path === candidate &&
            evidenceAssertionSatisfiesRequirement(assertion, requirement))) {
            return true;
        }
        const separator = candidate.lastIndexOf("/");
        if (separator <= 0)
            return false;
        candidate = candidate.slice(0, separator);
    }
    return false;
}
export function valueAtEvidencePointer(value, pointer) {
    let current = value;
    for (const encoded of pointer.slice(1).split("/")) {
        const segment = encoded.replaceAll("~1", "/").replaceAll("~0", "~");
        if (typeof current !== "object" || current === null || !(segment in current)) {
            throw new Error(`Evidence path ${pointer} does not exist in the revision.`);
        }
        current = current[segment];
    }
    return current;
}
function pointerExists(value, pointer) {
    try {
        valueAtEvidencePointer(value, pointer);
        return true;
    }
    catch {
        return false;
    }
}
function isComposableObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function evidenceCoverageChildren(value, path) {
    if (path === "/domains" && Array.isArray(value)) {
        return value.map((_, index) => `${path}/${index}/value`);
    }
    if (Array.isArray(value))
        return value.map((_, index) => `${path}/${index}`);
    if (!isComposableObject(value))
        return [];
    const keys = Object.keys(value).sort(compareCanonicalStrings);
    const semanticKeys = keys.filter((key) => !(path === "/lifecycle" && key === "effective_from") &&
        key !== "benefit_id" &&
        !(path.startsWith("/eligibility/") && (key === "criterion_id" || key === "reason")) &&
        !(path.startsWith("/eligibility/") && key === "type") &&
        !(path.startsWith("/eligibility/") &&
            key === "kind" &&
            ["predicate", "manual", "constant"].includes(String(value.kind))));
    return semanticKeys.map((key) => `${path}/${escapePointerSegment(key)}`);
}
function escapePointerSegment(value) {
    return value.replaceAll("~", "~0").replaceAll("/", "~1");
}
//# sourceMappingURL=evidence-coverage.js.map