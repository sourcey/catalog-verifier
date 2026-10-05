import { canonicalJson, compareCanonicalStrings, digest, digestFromPathSegment, } from "provenry/primitives";
import { catalogPublicationChangeSetCoreSchema, catalogPublicationChangeSetSchema, catalogPublicationProposalCoreSchema, catalogPublicationProposalSchema, publicationIngressReceiptCoreSchema, publicationIngressReceiptSchema, } from "../../../contracts/publication/src/index.js";
import { catalogPublicationAdmittedInputDigests, catalogPublicationIngressUnion, verifyCatalogPublicationInputClosure, } from "../../catalog-admission/src/index.js";
export function verifyPublicationInputs(bundle, delta, files) {
    const proposals = valuesUnder(files, "publication/proposals/").map(([path, input]) => {
        const proposal = catalogPublicationProposalSchema.parse(input);
        const { proposal_digest: proposalDigest, ...core } = proposal;
        assertAddressed(path, proposalDigest, digest(catalogPublicationProposalCoreSchema.parse(core)), "proposal");
        return proposal;
    });
    const changeSets = valuesUnder(files, "publication/change-sets/").map(([path, input]) => {
        const changeSet = catalogPublicationChangeSetSchema.parse(input);
        const { change_set_digest: changeSetDigest, ...core } = changeSet;
        assertAddressed(path, changeSetDigest, digest(catalogPublicationChangeSetCoreSchema.parse(core)), "Change Set");
        return changeSet;
    });
    const receipts = valuesUnder(files, "publication/ingress/")
        .map(([path, input]) => {
        const receipt = publicationIngressReceiptSchema.parse(input);
        const { receipt_digest: receiptDigest, ...core } = receipt;
        assertAddressed(path, receiptDigest, digest(publicationIngressReceiptCoreSchema.parse(core)), "ingress receipt");
        return receipt;
    })
        .sort((left, right) => compareCanonicalStrings(left.receipt_digest, right.receipt_digest));
    if (receipts.length === 0) {
        throw new Error("Catalog delta must close ingress receipt provenance.");
    }
    const proposalsByDigest = new Map(proposals.map((proposal) => [proposal.proposal_digest, proposal]));
    const changeSetsByProposal = new Map(changeSets.map((changeSet) => [changeSet.proposal_digest, changeSet]));
    if (proposalsByDigest.size !== proposals.length ||
        changeSetsByProposal.size !== changeSets.length)
        throw new Error("Catalog publication must retain exactly one Change Set for each addressed proposal.");
    const ingresses = receipts.map((receipt) => {
        const proposal = proposalsByDigest.get(receipt.proposal_digest);
        const changeSet = changeSetsByProposal.get(receipt.proposal_digest);
        if (!proposal || !changeSet)
            throw new Error("Catalog ingress lacks its retained proposal or Change Set.");
        return { proposal, change_set: changeSet, ingress_receipt: receipt };
    });
    const union = catalogPublicationIngressUnion(ingresses);
    const proposal = proposalsByDigest.get(union.proposal_digest);
    const changeSet = changeSetsByProposal.get(union.proposal_digest);
    if (!proposal || !changeSet)
        throw new Error("Catalog delta lacks its exact aggregate publication plan.");
    const publication = verifyCatalogPublicationInputClosure({
        proposal,
        change_set: changeSet,
        ingresses,
    });
    if (publication.proposal.live_parent_release_id !== delta.base.release.release_id) {
        throw new Error("Catalog publication inputs do not share one proposal and live parent.");
    }
    const admittedInputs = catalogPublicationAdmittedInputDigests(publication);
    const retainedInputs = [
        ...proposals.map(({ proposal_digest }) => proposal_digest),
        ...changeSets.map(({ change_set_digest }) => change_set_digest),
        ...receipts.map(({ receipt_digest }) => receipt_digest),
    ].sort(compareCanonicalStrings);
    if (canonicalJson(admittedInputs) !== canonicalJson(retainedInputs) ||
        canonicalJson(admittedInputs) !== canonicalJson(bundle.admitted_input_digests) ||
        canonicalJson(admittedInputs) !== canonicalJson(delta.admitted_input_digests)) {
        throw new Error("Catalog publication objects do not close the admitted input digest set.");
    }
    return publication;
}
function valuesUnder(files, prefix) {
    return [...files.entries()]
        .filter(([path]) => path.startsWith(prefix))
        .sort(([left], [right]) => compareCanonicalStrings(left, right))
        .map(([path, bytes]) => [path, JSON.parse(bytes.toString("utf8"))]);
}
function assertAddressed(path, declared, computed, label) {
    const filename = path.split("/").at(-1);
    const address = filename?.endsWith(".json")
        ? digestFromPathSegment(filename.slice(0, -".json".length))
        : null;
    if (path.split("/").length !== 3 || address !== declared || computed !== declared) {
        throw new Error(`Catalog publication ${label} ${path} is not content-addressed.`);
    }
}
//# sourceMappingURL=publication-inputs.js.map