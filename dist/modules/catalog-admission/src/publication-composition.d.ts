import { type Digest } from "provenry/primitives";
import type { EntityAuthoring } from "../../../contracts/authoring/src/index.js";
import type { CatalogPublicationComposition, CatalogPublicationIngress } from "../../../contracts/publication/src/index.js";
import { type CatalogPublicationPlanningInput } from "./publication.js";
import { type CatalogPublicationImpactQuery } from "./publication-dependencies.js";
type PublicationContext = Omit<Pick<CatalogPublicationPlanningInput, "currentEntities" | "currentAssetBindings" | "currentPolicies" | "currentContractAuthorityDigest" | "impactIndex">, "currentAssetBindings"> & {
    /** Composition always receives the exact retained asset slice. */
    readonly currentAssetBindings: NonNullable<CatalogPublicationPlanningInput["currentAssetBindings"]>;
};
/** Resolve every member and the union against one exact-parent index. Ingress
 * authorization stays unchanged; only its dependency-derived Change Set moves. */
export declare function resolveCatalogPublicationCompositionImpact<T extends CatalogPublicationComposition>(publication: T, index: CatalogPublicationImpactQuery): T;
/** Combine admitted plans, not authorizations. Every member is independently
 * revalidated against the same targeted live slice before the ordinary planner
 * constructs the union. This operation does no capture, model work or effects. */
export declare function composeCatalogPublication(input: PublicationContext & {
    readonly ingresses: readonly CatalogPublicationIngress[];
}): CatalogPublicationComposition;
/** Verify retained membership without broadening an ingress to the aggregate.
 * The production composer also rederives every member against actual current
 * inputs. Retained objects remain ordinary addressed proposals and Change Sets. */
export declare function verifyCatalogPublicationInputClosure(input: CatalogPublicationComposition): CatalogPublicationComposition;
/** Validate retained authoring changes against the verified parent slice, not
 * against other caller-supplied Change Sets. Membership alone cannot establish
 * completeness when every member omits the same change or public path. */
export declare function verifyCatalogPublicationAuthoringChanges(input: {
    readonly publication: CatalogPublicationComposition;
    readonly priorAuthoring: ReadonlyMap<string, EntityAuthoring | null>;
}): void;
/** The aggregate is the exact union, not a caller-selected root or new receipt. */
export declare function catalogPublicationIngressUnion(input: readonly CatalogPublicationIngress[]): {
    live_parent_release_id: string;
    candidate_entities: {
        schema_version: "sourcey.entity-authoring/v1alpha1";
        programs: {
            program_id: string;
            program_slug: string;
            program_slug_aliases: string[];
            title: string;
            summary?: string | undefined;
            source_ids: string[];
        }[];
        entity: {
            entity_id: string;
            slug: string;
            slug_aliases: string[];
            name: string;
            domains: {
                value: string;
                role: "alias" | "primary";
                valid_from: string;
                valid_until?: string | undefined;
            }[];
            category: string;
        };
        profile: {
            summary?: string | undefined;
            description: string;
            links: {
                site: string;
                pricing?: string | undefined;
            };
        };
        sources: {
            source_id: string;
            url: string;
        }[];
        offers: {
            offer_id: string;
            program_id?: string | undefined;
            offer_slug: string;
            offer_slug_aliases: string[];
            title: string;
            summary: string;
            description?: string | undefined;
            lifecycle: {
                status: "active" | "ended" | "withdrawn";
                effective_from: string;
                effective_until?: string | undefined;
            };
            economics: {
                consideration: {
                    kind: "none";
                } | {
                    kind: "fixed";
                    amount: {
                        currency: string;
                        minor_units: number;
                    };
                } | {
                    kind: "variable";
                    description: string;
                } | {
                    kind: "unknown";
                    description: string;
                };
                benefits: ({
                    benefit_id: string;
                    description: string;
                    kind: "credit";
                    value: {
                        kind: "range";
                        minimum: {
                            currency: string;
                            minor_units: number;
                        };
                        maximum: {
                            currency: string;
                            minor_units: number;
                        };
                    } | {
                        kind: "exact";
                        amount: {
                            currency: string;
                            minor_units: number;
                        };
                    } | {
                        kind: "up-to";
                        amount: {
                            currency: string;
                            minor_units: number;
                        };
                    } | {
                        kind: "at-least";
                        amount: {
                            currency: string;
                            minor_units: number;
                        };
                    };
                    duration?: {
                        kind: "exact";
                        value: string;
                    } | {
                        kind: "up-to";
                        value: string;
                    } | {
                        kind: "at-least";
                        value: string;
                    } | {
                        kind: "range";
                        minimum: string;
                        maximum: string;
                    } | undefined;
                } | {
                    benefit_id: string;
                    description: string;
                    kind: "discount";
                    percentage: {
                        kind: "range";
                        minimum_basis_points: number;
                        maximum_basis_points: number;
                    } | {
                        kind: "exact";
                        basis_points: number;
                    } | {
                        kind: "up-to";
                        basis_points: number;
                    } | {
                        kind: "at-least";
                        basis_points: number;
                    };
                    applies_to?: string | undefined;
                    duration?: {
                        kind: "exact";
                        value: string;
                    } | {
                        kind: "up-to";
                        value: string;
                    } | {
                        kind: "at-least";
                        value: string;
                    } | {
                        kind: "range";
                        minimum: string;
                        maximum: string;
                    } | undefined;
                } | {
                    benefit_id: string;
                    description: string;
                    kind: "cashback";
                    value: {
                        kind: "money";
                        value: {
                            kind: "range";
                            minimum: {
                                currency: string;
                                minor_units: number;
                            };
                            maximum: {
                                currency: string;
                                minor_units: number;
                            };
                        } | {
                            kind: "exact";
                            amount: {
                                currency: string;
                                minor_units: number;
                            };
                        } | {
                            kind: "up-to";
                            amount: {
                                currency: string;
                                minor_units: number;
                            };
                        } | {
                            kind: "at-least";
                            amount: {
                                currency: string;
                                minor_units: number;
                            };
                        };
                    } | {
                        kind: "percentage";
                        value: {
                            kind: "range";
                            minimum_basis_points: number;
                            maximum_basis_points: number;
                        } | {
                            kind: "exact";
                            basis_points: number;
                        } | {
                            kind: "up-to";
                            basis_points: number;
                        } | {
                            kind: "at-least";
                            basis_points: number;
                        };
                    };
                    duration?: {
                        kind: "exact";
                        value: string;
                    } | {
                        kind: "up-to";
                        value: string;
                    } | {
                        kind: "at-least";
                        value: string;
                    } | {
                        kind: "range";
                        minimum: string;
                        maximum: string;
                    } | undefined;
                } | {
                    benefit_id: string;
                    description: string;
                    kind: "waiver";
                    waived_item: string;
                } | {
                    benefit_id: string;
                    description: string;
                    kind: "free-service";
                    service: string;
                    duration?: {
                        kind: "exact";
                        value: string;
                    } | {
                        kind: "up-to";
                        value: string;
                    } | {
                        kind: "at-least";
                        value: string;
                    } | {
                        kind: "range";
                        minimum: string;
                        maximum: string;
                    } | undefined;
                } | {
                    benefit_id: string;
                    description: string;
                    kind: "other";
                })[];
            };
            eligibility: {
                rule: import("../../catalog-query/src/contracts.js").EligibilityRule;
            };
            roles: {
                terms_authority_entity_id: string;
                access_operator_entity_id: string;
            };
            source_ids?: string[] | undefined;
            declared?: true | undefined;
            access: {
                availability: "automatic" | "invite" | "membership" | "other" | "public" | "referral";
                method: "automatic" | "code" | "contact" | "form" | "other";
                public_code?: string | undefined;
                url?: string | undefined;
                instructions?: string | undefined;
            };
            terms_url?: string | undefined;
        }[];
    }[];
    candidate_assets: {
        proposal_contract: "sourcey.entity-asset-proposal/v1alpha1";
        base_release_id: string;
        entity_id: string;
        role: "icon";
        expected_current_binding_event_id: string | null;
        capture: {
            capture_contract: "sourcey.retained-asset-capture/v1alpha1";
            source: {
                kind: "upload";
                upload_receipt_digest: string;
            } | {
                kind: "official_url";
                requested_url: string;
                final_url: string;
                redirect_count: number;
                capture_receipt_digest: string;
            } | {
                kind: "sourcey_fallback";
                generation_rule: "sourcey.entity-monogram-5x7/v1";
                fallback_reason_digest: string;
            };
            original_digest: string;
            bytes: number;
            media_type: "image/jpeg" | "image/png" | "image/svg+xml" | "image/webp";
            captured_at: string;
            storage_receipt_digest: string;
            capture_digest: string;
        };
        transform_profile: {
            profile_contract: "sourcey.asset-transform-profile/v1alpha1";
            profile_version: string;
            toolchain_digest: string;
            output_media_type: "image/jpeg" | "image/png" | "image/svg+xml" | "image/webp";
            maximum_width: number;
            maximum_height: number;
            maximum_source_aspect_ratio: number | null;
            strip_metadata: true;
            reject_active_content: true;
            profile_digest: string;
        };
        asset: {
            asset_contract: "sourcey.asset/v1alpha1";
            original: {
                digest: string;
                bytes: number;
                media_type: "image/jpeg" | "image/png" | "image/svg+xml" | "image/webp";
                source_path: string;
            };
            safe_variants: {
                digest: string;
                bytes: number;
                media_type: "image/jpeg" | "image/png" | "image/svg+xml" | "image/webp";
                source_path: string;
                served_path: string;
                width: number;
                height: number;
                transform_profile_digest: string;
                transform_receipt_digest: string;
            }[];
            transform_receipts: {
                receipt_contract: "sourcey.asset-transform-receipt/v1alpha1";
                original_digest: string;
                safe_digest: string;
                profile_digest: string;
                toolchain_digest: string;
                receipt_digest: string;
            }[];
            redistribution: {
                basis: "nominative-use" | "redistributable-license" | "sourcey-owned" | "vendor-approved";
                license: string;
                notice: string;
                trademark_owner: string;
                fallback_reason?: string | undefined;
            };
            asset_object_digest: string;
        };
        served_digest: string;
        safe_storage_receipt_digest: string;
        authority_basis: "editorial-review" | "licensed-source" | "sourcey-owned" | "vendor-authority";
        authority_claim_id?: string | undefined;
        source_basis: string;
        approval_scope: "entity-icon";
        review: {
            review_contract: "sourcey.entity-asset-review/v1alpha1";
            base_release_id: string;
            entity_id: string;
            role: "icon";
            capture_digest: string;
            served_digest: string;
            redistribution: {
                basis: "nominative-use" | "redistributable-license" | "sourcey-owned" | "vendor-approved";
                license: string;
                notice: string;
                trademark_owner: string;
                fallback_reason?: string | undefined;
            };
            authority_basis: "editorial-review" | "licensed-source" | "sourcey-owned" | "vendor-authority";
            source_basis: string;
            decision: "approved";
            decision_basis: {
                kind: "human";
                actor_id: string;
            } | {
                kind: "policy";
                policy_id: string;
                policy_digest: string;
                evaluator_id: string;
                evaluator_digest: string;
                input_digest: string;
                execution_receipt_digest: string;
            };
            decided_at: string;
            rationale: string;
            review_artifact_digest: string;
        };
        effective_from: string;
        proposal_digest: string;
    }[];
    remove_entity_ids: string[];
    expected_current_entities: {
        entity_id: string;
        snapshot_digest: string | null;
    }[];
    expected_current_asset_bindings: {
        entity_id: string;
        role: "icon";
        binding_event_id: string | null;
        binding_digest: string | null;
    }[];
    authority_proposals: {
        purpose: "catalog-attestation" | "catalog-authority" | "catalog-dispute" | "catalog-evidence" | "catalog-feed" | "catalog-identity" | "catalog-policy" | "catalog-release" | "catalog-verification";
        proposal_digest: string;
        dependency_keys: string[];
        public_input_digest?: string | undefined;
    }[];
    target_policies: {
        key: string;
        digest: string;
    }[];
    target_contract_authority_digest: string;
    proposal_digest: string;
};
export declare function catalogPublicationAdmittedInputDigests(input: CatalogPublicationComposition): Digest[];
export {};
//# sourceMappingURL=publication-composition.d.ts.map