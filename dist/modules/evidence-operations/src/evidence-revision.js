import { catalogRevisionContracts, entityRevisionSchema, offerRevisionSchema, programRevisionSchema, } from "../../../contracts/revisions/src/index.js";
export function parseEvidenceRevision(input) {
    const contract = input?.revision_contract;
    if (contract === catalogRevisionContracts.entity)
        return entityRevisionSchema.parse(input);
    if (contract === catalogRevisionContracts.program)
        return programRevisionSchema.parse(input);
    if (contract === catalogRevisionContracts.offer)
        return offerRevisionSchema.parse(input);
    throw new Error("Evidence revision has an unknown revision contract.");
}
//# sourceMappingURL=evidence-revision.js.map