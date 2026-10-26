import DOMPurify, { type ElementHook, type UponSanitizeAttributeHook, type UponSanitizeElementHook } from "isomorphic-dompurify";

const secureLinks: ElementHook = (node) => {
  if (node.nodeName !== "A") return;
  const link = node as HTMLAnchorElement;
  const target = link.getAttribute("target");
  if (target && target !== "_blank" && target !== "_self") link.removeAttribute("target");
  if (target === "_blank") {
    const rel = new Set((link.getAttribute("rel") ?? "").split(/\s+/).filter((value) => value && value !== "opener"));
    rel.add("noopener");
    rel.add("noreferrer");
    link.setAttribute("rel", [...rel].join(" "));
  }
};

const filterInputs: UponSanitizeElementHook = (node, data) => {
  if (data.tagName !== "input") return;
  const input = node as HTMLInputElement;
  if (input.getAttribute("type")?.toLowerCase() !== "checkbox") input.remove();
  else input.disabled = true; // GFM task lists are display-only, never forms.
};

// Keep the formatting emitted by Markdown and the legacy Quill editor, without
// allowing arbitrary application classes, inline layouts or executable content.
const filterFormatting: UponSanitizeAttributeHook = (_node, attribute) => {
  if (attribute.attrName === "class") {
    attribute.attrValue = attribute.attrValue.split(/\s+/).filter((name) =>
      /^(?:ql-[\w-]+|language-[\w+-]+|hljs(?:-[\w-]+)?|task-list-item|contains-task-list)$/.test(name)
    ).join(" ");
    attribute.keepAttr = Boolean(attribute.attrValue);
  }

  if (attribute.attrName === "style") {
    attribute.attrValue = attribute.attrValue.split(";").filter((declaration) => {
      const [property, value, extra] = declaration.split(":").map((part) => part.trim());
      if (!value || extra) return false;
      if (property === "text-align") return /^(left|right|center|justify|start|end)$/.test(value);
      return /^(color|background-color)$/.test(property) &&
        /^(?:#[\da-f]{3,8}|[a-z]+|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%]+\))$/i.test(value);
    }).join(";");
    attribute.keepAttr = Boolean(attribute.attrValue);
  }

  if (attribute.attrName === "src" && /^\s*data:/i.test(attribute.attrValue)) {
    attribute.keepAttr = /^data:image\/(?:png|jpe?g|webp|gif|avif);base64,/i.test(attribute.attrValue);
  }
};

export function sanitizePostHtml(html: string): string {
  // The hook is scoped to this synchronous call, including during SSR/HMR.
  DOMPurify.addHook("uponSanitizeAttribute", filterFormatting);
  DOMPurify.addHook("uponSanitizeElement", filterInputs);
  DOMPurify.addHook("afterSanitizeAttributes", secureLinks);
  try {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "a", "p", "br", "hr", "h1", "h2", "h3", "h4", "h5", "h6",
        "div", "span", "strong", "b", "em", "i", "u", "s", "del",
        "blockquote", "ul", "ol", "li", "pre", "code", "img",
        "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
        "sup", "sub", "kbd", "samp", "details", "summary", "figure", "figcaption",
        // Quill language controls are read/removed by its renderer, not mounted.
        "select", "option", "input",
      ],
      ALLOWED_ATTR: [
        "href", "src", "alt", "title", "width", "height", "class", "style", "target", "rel",
        "data-language", "data-list", "colspan", "rowspan", "scope", "start",
        "reversed", "value", "selected", "open", "type", "checked", "disabled",
      ],
      ALLOW_DATA_ATTR: false,
      ALLOW_ARIA_ATTR: false,
    });
  } finally {
    DOMPurify.removeHook("uponSanitizeAttribute", filterFormatting);
    DOMPurify.removeHook("uponSanitizeElement", filterInputs);
    DOMPurify.removeHook("afterSanitizeAttributes", secureLinks);
  }
}
