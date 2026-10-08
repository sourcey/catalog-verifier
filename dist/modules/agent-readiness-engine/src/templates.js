import { agentReadinessTemplateReferences } from "../../../contracts/agent-readiness/src/index.js";
/** A template the run cannot fill: residue of this run, never a fact about the service. */
export class TemplateError extends Error {
    name = "TemplateError";
}
const WHOLE = /^\{\{([^{}]+)\}\}$/u;
/** A string template filled in; every placeholder must name a scalar the run holds. */
export function resolveTemplate(template, context) {
    const references = agentReadinessTemplateReferences(template);
    if (references === null)
        throw new TemplateError("The template is not valid.");
    let index = 0;
    return template.replace(/\{\{[^{}]+\}\}/gu, () => {
        const value = referenced(references[index++], context);
        if (value === null || typeof value === "object") {
            throw new TemplateError("Only a scalar can be interpolated into text.");
        }
        return String(value);
    });
}
/**
 * A JSON template filled in. A string that is exactly one placeholder takes the
 * referenced value with its JSON type; any other string interpolates scalars.
 */
export function resolveJsonTemplate(value, context) {
    if (typeof value === "string") {
        const references = agentReadinessTemplateReferences(value);
        if (references?.length === 1 && WHOLE.test(value)) {
            return referenced(references[0], context);
        }
        return resolveTemplate(value, context);
    }
    if (Array.isArray(value))
        return value.map((item) => resolveJsonTemplate(item, context));
    if (value !== null && typeof value === "object") {
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveJsonTemplate(item, context)]));
    }
    return value;
}
function referenced(reference, context) {
    switch (reference.kind) {
        case "nonce":
            return context.nonce;
        case "input": {
            if (!Object.hasOwn(context.inputs, reference.name)) {
                throw new TemplateError(`The job has no input ${reference.name}.`);
            }
            return context.inputs[reference.name];
        }
        case "sink": {
            const address = context.sinks[reference.name];
            if (address === undefined)
                throw new TemplateError(`No sink ${reference.name} is bound.`);
            return address;
        }
        case "call": {
            if (!context.calls.has(reference.callId)) {
                throw new TemplateError(`Call ${reference.callId} has no JSON response to read.`);
            }
            const value = valueAtPointer(context.calls.get(reference.callId), reference.pointer);
            if (value === undefined) {
                throw new TemplateError(`Call ${reference.callId} has nothing at ${reference.pointer}.`);
            }
            return value;
        }
    }
}
/** The value an RFC 6901 pointer names, or undefined. */
export function valueAtPointer(document, pointer) {
    if (pointer === "")
        return document;
    let value = document;
    for (const raw of pointer.slice(1).split("/")) {
        const token = raw.replaceAll("~1", "/").replaceAll("~0", "~");
        if (Array.isArray(value)) {
            if (!/^(?:0|[1-9][0-9]*)$/u.test(token))
                return undefined;
            value = value[Number(token)];
        }
        else if (value !== null && typeof value === "object" && Object.hasOwn(value, token)) {
            value = value[token];
        }
        else {
            return undefined;
        }
    }
    return value;
}
//# sourceMappingURL=templates.js.map