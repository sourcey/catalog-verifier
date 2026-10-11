import { AGENT_READINESS_MAXIMUM_PAGES, AGENT_READINESS_PAGE_ROLES } from "./shared.js";
/**
 * What the probe reads of a listing's own surfaces: the roles it rules out, its
 * checkout or top-up page or that the job needs none, and the pages a person's
 * or a vendor's step happens on, each requested once, an access setting, a
 * claim page and a key renewal page on the interface they serve.
 */
export function validateProbedSurfaces(value, context) {
    const ruledOut = value.surface_exclusions;
    const exclusionIds = ruledOut.map(({ exclusion_id }) => exclusion_id);
    if (new Set(exclusionIds).size !== exclusionIds.length) {
        context.addIssue({
            code: "custom",
            path: ["surface_exclusions"],
            message: "Surface exclusion IDs must be unique.",
        });
    }
    const roles = ruledOut.map(({ role }) => role);
    if (new Set(roles).size !== roles.length) {
        context.addIssue({
            code: "custom",
            path: ["surface_exclusions"],
            message: "A surface role may be excluded only once.",
        });
    }
    const declared = new Set(value.resources.flatMap((resource) => resource.roles));
    for (const [index, surface] of ruledOut.entries()) {
        if (declared.has(surface.role)) {
            context.addIssue({
                code: "custom",
                path: ["surface_exclusions", index, "role"],
                message: `Role '${surface.role}' is declared by a resource and cannot also be excluded.`,
            });
        }
    }
    // An access setting turns on, a claim page claims what the agent made through, and a key renewal
    // page replaces the key of, the interface that lists it (north star §5.6, Onboard and Sustain).
    const listed = new Set(value.interfaces.flatMap(({ endpoint_ids }) => endpoint_ids));
    const listedBy = {
        access_setting: "An access setting is listed by the interface it turns on.",
        claim: "A claim page is listed by the interface it claims for.",
        key_renewal: "A key renewal page is listed by the interface whose key it replaces.",
    };
    for (const [index, endpoint] of value.endpoints.entries()) {
        for (const [role, message] of Object.entries(listedBy)) {
            if (endpoint.roles.includes(role) && !listed.has(endpoint.endpoint_id)) {
                context.addIssue({ code: "custom", path: ["endpoints", index, "roles"], message });
            }
        }
    }
    // Pay rests on the checkout or the top-up page the listing names, or on the listing ruling a
    // checkout out (north star §5.6).
    const checkoutNamed = declared.has("checkout") ||
        value.endpoints.some((endpoint) => endpoint.roles.includes("checkout") || endpoint.roles.includes("top_up"));
    const checkoutRuledOut = roles.includes("checkout");
    if (checkoutNamed && checkoutRuledOut) {
        context.addIssue({
            code: "custom",
            path: ["surface_exclusions"],
            message: "A declaration names its checkout or top-up page, or rules a checkout out, not both.",
        });
    }
    if (value.job_operations.length > 0 && !checkoutNamed && !checkoutRuledOut) {
        context.addIssue({
            code: "custom",
            path: ["surface_exclusions"],
            message: "A declaration with job operations names its checkout or top-up page, or rules a checkout out where the job needs none.",
        });
    }
    const pageRole = (role) => AGENT_READINESS_PAGE_ROLES.includes(role);
    const pages = value.endpoints.flatMap(({ roles }) => roles.filter(pageRole)).length +
        value.resources.flatMap(({ roles }) => roles.filter((role) => role === "checkout")).length;
    if (pages > AGENT_READINESS_MAXIMUM_PAGES) {
        context.addIssue({
            code: "custom",
            path: ["endpoints"],
            message: `A declaration names at most ${AGENT_READINESS_MAXIMUM_PAGES} pages for a person's or a vendor's step.`,
        });
    }
}
//# sourceMappingURL=surfaces.js.map