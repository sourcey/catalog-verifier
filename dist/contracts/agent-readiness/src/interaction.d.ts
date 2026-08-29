import { z } from "zod";
/** Non-mutating browser actions admitted by an observed readiness method. */
export declare const agentReadinessAllowedActionSchema: z.ZodEnum<{
    navigate: "navigate";
    follow_link: "follow_link";
    expand_disclosure: "expand_disclosure";
    select_non_submitting_control: "select_non_submitting_control";
    scroll: "scroll";
    wait: "wait";
}>;
/** Consequential effects that an observed public assessment must never perform. */
export declare const agentReadinessForbiddenEffectSchema: z.ZodEnum<{
    provision: "provision";
    submit_application: "submit_application";
    create_account: "create_account";
    send_verification_code: "send_verification_code";
    accept_terms: "accept_terms";
    enter_credentials: "enter_credentials";
    enter_payment_details: "enter_payment_details";
    purchase: "purchase";
    create_key: "create_key";
    invoke_billable_service: "invoke_billable_service";
}>;
export type AgentReadinessAllowedAction = z.infer<typeof agentReadinessAllowedActionSchema>;
export type AgentReadinessForbiddenEffect = z.infer<typeof agentReadinessForbiddenEffectSchema>;
//# sourceMappingURL=interaction.d.ts.map