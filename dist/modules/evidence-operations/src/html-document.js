import { Parser, Tokenizer, } from "parse5";
/** A run of appends longer than this leaves the native string for gathered pieces. */
const SPILL_LENGTH = 1_024;
/** Spilled runs joined into one flat piece, so unjoined runs hold at most about a megabyte. */
const RUNS_PER_PIECE = 32;
/**
 * parse5 builds attribute values and character runs (an inline script) by appending one code
 * point at a time. Appended in place, megabytes of it become a rope with one heap node per
 * character: 7 MB of base64 held 222 MB, a 3 MB script 96 MB. Short runs stay native strings;
 * a long one spills into flat pieces and stays its own size.
 */
class SpilledText {
    #pieces = [];
    #runs = [];
    get holding() {
        return this.#pieces.length > 0 || this.#runs.length > 0;
    }
    spill(run) {
        this.#runs.push(run);
        if (this.#runs.length === RUNS_PER_PIECE) {
            this.#pieces.push(this.#runs.join(""));
            this.#runs.length = 0;
        }
    }
    /** The spilled text followed by `tail`, leaving nothing spilled. */
    take(tail) {
        const text = this.#pieces.join("") + this.#runs.join("") + tail;
        this.#pieces.length = 0;
        this.#runs.length = 0;
        return text;
    }
}
/** The tokenizer only appends to a value (`+=`); it reads back the short native tail. */
class GatheredAttribute {
    name;
    #tail = "";
    #spilled = new SpilledText();
    constructor(name) {
        this.name = name;
    }
    get value() {
        return this.#tail;
    }
    set value(text) {
        if (text.length < SPILL_LENGTH) {
            this.#tail = text;
        }
        else {
            this.#spilled.spill(text);
            this.#tail = "";
        }
    }
    settle() {
        return {
            name: this.name,
            value: this.#spilled.holding ? this.#spilled.take(this.#tail) : this.#tail,
        };
    }
}
/** parse5's tokenizer, handing the tree builder the same plain tokens it builds itself. */
class GatheringTokenizer extends Tokenizer {
    #spilledCharacters = new SpilledText();
    _createAttr(attrNameFirstCh) {
        super._createAttr(attrNameFirstCh);
        this.currentAttr = new GatheredAttribute(attrNameFirstCh);
    }
    emitCurrentTagToken() {
        const token = this.currentToken;
        token.attrs = token.attrs.map((attribute) => attribute instanceof GatheredAttribute ? attribute.settle() : attribute);
        super.emitCurrentTagToken();
    }
    _appendCharToCurrentCharacterToken(type, ch) {
        super._appendCharToCurrentCharacterToken(type, ch);
        const token = this.currentCharacterToken;
        if (token.chars.length >= SPILL_LENGTH) {
            this.#spilledCharacters.spill(token.chars);
            token.chars = "";
        }
    }
    _emitCurrentCharacterToken(nextLocation) {
        if (this.currentCharacterToken && this.#spilledCharacters.holding) {
            this.currentCharacterToken.chars = this.#spilledCharacters.take(this.currentCharacterToken.chars);
        }
        super._emitCurrentCharacterToken(nextLocation);
    }
}
class GatheringParser extends Parser {
    constructor(options) {
        super(options);
        const tokenizer = new GatheringTokenizer(this.options, this);
        tokenizer.inForeignNode = this.tokenizer.inForeignNode;
        this.tokenizer = tokenizer;
    }
}
/** parse5's document tree for HTML, with long attribute values and text held at their size. */
export function parseHtmlDocument(html) {
    return GatheringParser.parse(html);
}
//# sourceMappingURL=html-document.js.map