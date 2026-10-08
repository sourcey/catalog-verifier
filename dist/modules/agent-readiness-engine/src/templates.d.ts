/** What a template may read: job inputs, the run's nonce, sink addresses and earlier calls' JSON. */
export interface TemplateContext {
    readonly inputs: Readonly<Record<string, string | number | boolean>>;
    readonly nonce: string;
    readonly sinks: Readonly<Record<string, string>>;
    readonly calls: ReadonlyMap<string, unknown>;
}
/** A template the run cannot fill: residue of this run, never a fact about the service. */
export declare class TemplateError extends Error {
    readonly name = "TemplateError";
}
/** A string template filled in; every placeholder must name a scalar the run holds. */
export declare function resolveTemplate(template: string, context: TemplateContext): string;
/**
 * A JSON template filled in. A string that is exactly one placeholder takes the
 * referenced value with its JSON type; any other string interpolates scalars.
 */
export declare function resolveJsonTemplate(value: unknown, context: TemplateContext): unknown;
/** The value an RFC 6901 pointer names, or undefined. */
export declare function valueAtPointer(document: unknown, pointer: string): unknown;
//# sourceMappingURL=templates.d.ts.map