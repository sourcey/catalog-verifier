import { z } from "zod";
/** Non-mutating browser actions admitted by an observed readiness method. */
export declare const agentReadinessAllowedActionSchema: z.ZodEnum<{
    expand_disclosure: "expand_disclosure";
    follow_link: "follow_link";
    navigate: "navigate";
    scroll: "scroll";
    select_non_submitting_control: "select_non_submitting_control";
    wait: "wait";
}>;
/** Consequential effects that an observed public assessment must never perform. */
export declare const agentReadinessForbiddenEffectSchema: z.ZodEnum<{
    accept_terms: "accept_terms";
    create_account: "create_account";
    create_key: "create_key";
    enter_credentials: "enter_credentials";
    enter_payment_details: "enter_payment_details";
    invoke_billable_service: "invoke_billable_service";
    provision: "provision";
    purchase: "purchase";
    send_verification_code: "send_verification_code";
    submit_application: "submit_application";
}>;
export type AgentReadinessAllowedAction = z.infer<typeof agentReadinessAllowedActionSchema>;
export type AgentReadinessForbiddenEffect = z.infer<typeof agentReadinessForbiddenEffectSchema>;
//# sourceMappingURL=interaction.d.ts.map