import DOMPurify, { type ElementHook, type UponSanitizeAttributeHook, type UponSanitizeElementHook } from "dompurify";
import {
  ALLOWED_ATTR,
  ALLOWED_TAGS,
  DATA_URI,
  SAFE_DATA_IMAGE,
  filterClassNames,
  filterStyle,
  secureRel,
} from "./sanitizePolicy";

// Browser-only sanitizer (e.g. the editor preview). Server rendering uses
// `sanitizeHtml.server.ts`, which does not depend on jsdom.

const secureLinks: ElementHook = (node) => {
  if (node.nodeName !== "A") return;
  const link = node as HTMLAnchorElement;
  const target = link.getAttribute("target");
  if (target && target !== "_blank" && target !== "_self") link.removeAttribute("target");
  if (target === "_blank") link.setAttribute("rel", secureRel(link.getAttribute("rel") ?? undefined));
};

const filterInputs: UponSanitizeElementHook = (node, data) => {
  if (data.tagName !== "input") return;
  const input = node as HTMLInputElement;
  if (input.getAttribute("type")?.toLowerCase() !== "checkbox") input.remove();
  else input.disabled = true; // GFM task lists are display-only, never forms.
};

const filterFormatting: UponSanitizeAttributeHook = (_node, attribute) => {
  if (attribute.attrName === "class") {
    attribute.attrValue = filterClassNames(attribute.attrValue);
    attribute.keepAttr = Boolean(attribute.attrValue);
  }

  if (attribute.attrName === "style") {
    attribute.attrValue = filterStyle(attribute.attrValue);
    attribute.keepAttr = Boolean(attribute.attrValue);
  }

  if (attribute.attrName === "src" && DATA_URI.test(attribute.attrValue)) {
    attribute.keepAttr = SAFE_DATA_IMAGE.test(attribute.attrValue);
  }
};

export function sanitizePostHtml(html: string): string {
  // Without a DOM, DOMPurify cannot sanitize; never emit unsanitized HTML.
  if (typeof window === "undefined" || !DOMPurify.isSupported) return "";

  // The hooks are scoped to this synchronous call.
  DOMPurify.addHook("uponSanitizeAttribute", filterFormatting);
  DOMPurify.addHook("uponSanitizeElement", filterInputs);
  DOMPurify.addHook("afterSanitizeAttributes", secureLinks);
  try {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS,
      ALLOWED_ATTR,
      ALLOW_DATA_ATTR: false,
      ALLOW_ARIA_ATTR: false,
    });
  } finally {
    DOMPurify.removeHook("uponSanitizeAttribute", filterFormatting);
    DOMPurify.removeHook("uponSanitizeElement", filterInputs);
    DOMPurify.removeHook("afterSanitizeAttributes", secureLinks);
  }
}
