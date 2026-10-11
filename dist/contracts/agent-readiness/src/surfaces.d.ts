import type { z } from "zod";
/**
 * What the probe reads of a listing's own surfaces: the roles it rules out, its
 * checkout or top-up page or that the job needs none, and the pages a person's
 * or a vendor's step happens on, each requested once, an access setting, a
 * claim page and a key renewal page on the interface they serve.
 */
export declare function validateProbedSurfaces(value: {
    readonly resources: readonly {
        readonly roles: readonly string[];
    }[];
    readonly endpoints: readonly {
        readonly endpoint_id: string;
        readonly roles: readonly string[];
    }[];
    readonly interfaces: readonly {
        readonly endpoint_ids: readonly string[];
    }[];
    readonly job_operations: readonly unknown[];
    readonly surface_exclusions: readonly {
        readonly exclusion_id: string;
        readonly role: string;
    }[];
}, context: z.RefinementCtx): void;
//# sourceMappingURL=surfaces.d.ts.map