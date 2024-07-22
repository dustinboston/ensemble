
export const HTML_TAGS = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "doctype",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "imgMap",
    "input",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "mark",
    "menu",
    "meter",
    "meta",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "picture",
    "pre",
    "portal",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "search",
    "section",
    "select",
    "slot",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
];

/**
 * Render an HTML tag.
 * Could also be used to interact with the DOM.
 * @param {string} tag
 * @returns {(...args: *[]) => string}
 */
export function htmlTag(tag) {
    return (...element) => {
        let attributes = "";
        let children = "";

        if (element) {
            if (Array.isArray(element[0])) {
                children = element[0].join("");
            } else if (typeof element[0] === "string") {
                children = element[0];
            } else if (typeof element[0] === "object" && element[0] !== null) {
                for (const [key, value] of Object.entries(element[0])) {
                    attributes += ` ${key}="${value}"`;
                }

                if (Array.isArray(element[1])) {
                    children = element[1].join("");
                } else if (typeof element[1] === "string") {
                    children = element[1];
                }
            }
        }

        // Self-closing tags
        const selfClosingTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
        if (selfClosingTags.has(tag)) {
            return `<${tag}${attributes} />`;
        }

        // Return the complete HTML string
        return `<${tag}${attributes}>${children}</${tag}>`;
    };
}

/**
 * Get a map of HTML tags to functions.
 * @returns {[string, Object|Function][]}
 */
export function getHtmlFunctionMap() {
    return HTML_TAGS.map((tag) => [tag, htmlTag(tag)]);
}
