import { z } from "zod";
/** Non-mutating browser actions admitted by an observed readiness method. */
export const agentReadinessAllowedActionSchema = z.enum([
    "navigate",
    "follow_link",
    "expand_disclosure",
    "select_non_submitting_control",
    "scroll",
    "wait",
]);
/** Consequential effects that an observed public assessment must never perform. */
export const agentReadinessForbiddenEffectSchema = z.enum([
    "submit_application",
    "create_account",
    "send_verification_code",
    "accept_terms",
    "enter_credentials",
    "enter_payment_details",
    "purchase",
    "provision",
    "create_key",
    "invoke_billable_service",
]);
//# sourceMappingURL=interaction.js.map