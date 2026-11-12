// Shared allowlist for post bodies. The server (sanitize-html) and the browser
// (DOMPurify) sanitizers both read from here so the two policies stay aligned.

export const ALLOWED_TAGS = [
  "a", "p", "br", "hr", "h1", "h2", "h3", "h4", "h5", "h6",
  "div", "span", "strong", "b", "em", "i", "u", "s", "del",
  "blockquote", "ul", "ol", "li", "pre", "code", "img",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
  "sup", "sub", "kbd", "samp", "details", "summary", "figure", "figcaption",
  // Quill language controls are read/removed by its renderer, not mounted.
  "select", "option", "input",
];

export const ALLOWED_ATTR = [
  "href", "src", "alt", "title", "width", "height", "class", "style", "target", "rel",
  "data-language", "data-list", "colspan", "rowspan", "scope", "start",
  "reversed", "value", "selected", "open", "type", "checked", "disabled",
];

// Keep the formatting emitted by Markdown and the legacy Quill editor, without
// allowing arbitrary application classes, inline layouts or executable content.
export const ALLOWED_CLASS =
  /^(?:ql-[\w-]+|language-[\w+-]+|hljs(?:-[\w-]+)?|task-list-item|contains-task-list)$/;

export const TEXT_ALIGN_VALUE = /^(left|right|center|justify|start|end)$/;
export const COLOR_VALUE =
  /^(?:#[\da-f]{3,8}|[a-z]+|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%]+\))$/i;

// Attribute values that could close a comment/raw-text element if the markup
// is reparsed (mirrors DOMPurify's built-in safety check).
export const UNSAFE_ATTR_VALUE = /((--!?|])>)|<\/(style|title|script|textarea|noscript)/i;

export const DATA_URI = /^\s*data:/i;
export const SAFE_DATA_IMAGE = /^data:image\/(?:png|jpe?g|webp|gif|avif);base64,/i;

export const filterClassNames = (value: string) =>
  value.split(/\s+/).filter((name) => ALLOWED_CLASS.test(name)).join(" ");

export const filterStyle = (value: string) =>
  value
    .split(";")
    .filter((declaration) => {
      const [property, propertyValue, extra] = declaration.split(":").map((part) => part.trim());
      if (!propertyValue || extra) return false;
      if (property === "text-align") return TEXT_ALIGN_VALUE.test(propertyValue);
      return /^(color|background-color)$/.test(property) && COLOR_VALUE.test(propertyValue);
    })
    .join(";");

export const secureRel = (rel: string | undefined) => {
  const values = new Set((rel ?? "").split(/\s+/).filter((value) => value && value !== "opener"));
  values.add("noopener");
  values.add("noreferrer");
  return [...values].join(" ");
};
