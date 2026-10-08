import { z } from "zod";
/** Company intake is shared by every product; it carries no product or Offer. */
export declare const companySubmissionSchema: z.ZodObject<{
    name: z.ZodString;
    domain: z.ZodString;
    category: z.ZodString;
    summary: z.ZodString;
    site_url: z.ZodURL;
}, z.core.$strict>;
export declare const companyDraftRequestSchema: z.ZodObject<{
    company: z.ZodObject<{
        name: z.ZodString;
        domain: z.ZodString;
        category: z.ZodString;
        summary: z.ZodString;
        site_url: z.ZodURL;
    }, z.core.$strict>;
    standing_result: z.ZodObject<{
        result_contract: z.ZodLiteral<"sourcey.standing-result/v1alpha1">;
        policy_digest: z.ZodString;
        evidence_digest: z.ZodString;
        registrable_domain: z.ZodString;
        official_source_url: z.ZodURL;
        route: z.ZodEnum<{
            correction_required: "correction_required";
            free_machine_review: "free_machine_review";
            human_verification_required: "human_verification_required";
            repair_required: "repair_required";
            temporarily_unavailable: "temporarily_unavailable";
        }>;
        reasons: z.ZodArray<z.ZodString>;
        evaluated_at: z.ZodISODateTime;
        expires_at: z.ZodISODateTime;
        result_digest: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const companyDraftDiagnosticSchema: z.ZodObject<{
    code: z.ZodEnum<{
        conflict: "conflict";
        ineligible: "ineligible";
        invalid: "invalid";
        required: "required";
    }>;
    path: z.ZodString;
    message: z.ZodString;
}, z.core.$strict>;
export declare const companyAuthoringFileSchema: z.ZodObject<{
    path: z.ZodString;
    content: z.ZodString;
    content_digest: z.ZodString;
}, z.core.$strict>;
export declare const companyDraftFailureSchema: z.ZodObject<{
    status: z.ZodEnum<{
        conflict: "conflict";
        incomplete: "incomplete";
        ineligible: "ineligible";
        invalid: "invalid";
    }>;
    diagnostics: z.ZodArray<z.ZodObject<{
        code: z.ZodEnum<{
            conflict: "conflict";
            ineligible: "ineligible";
            invalid: "invalid";
            required: "required";
        }>;
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type CompanyDraftRequest = z.infer<typeof companyDraftRequestSchema>;
export type CompanyDraftFailure = z.infer<typeof companyDraftFailureSchema>;
//# sourceMappingURL=index.d.ts.map