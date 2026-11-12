import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import {
  ALLOWED_ATTR,
  ALLOWED_TAGS,
  DATA_URI,
  SAFE_DATA_IMAGE,
  UNSAFE_ATTR_VALUE,
  filterClassNames,
  filterStyle,
  secureRel,
} from "./sanitizePolicy";

// Server-side sanitizer. sanitize-html is pure JS (no jsdom), so it runs in
// Vercel serverless functions without native DOM or extra runtime files.
export function sanitizePostHtmlOnServer(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { "*": ALLOWED_ATTR },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https", "data"] },
    allowProtocolRelative: false,
    // Styles are filtered by our own rules below; skip sanitize-html's CSS parser.
    parseStyleAttributes: false,
    disallowedTagsMode: "discard",
    exclusiveFilter: (frame) =>
      frame.tag === "input" && frame.attribs.type?.toLowerCase() !== "checkbox",
    transformTags: {
      "*": (tagName, attribs) => {
        const next = { ...attribs };

        for (const [name, value] of Object.entries(next)) {
          if (UNSAFE_ATTR_VALUE.test(value)) delete next[name];
        }

        if (next.class !== undefined) {
          const classes = filterClassNames(next.class);
          if (classes) next.class = classes;
          else delete next.class;
        }

        if (next.style !== undefined) {
          const style = filterStyle(next.style);
          if (style) next.style = style;
          else delete next.style;
        }

        if (tagName === "img" && next.src && DATA_URI.test(next.src) && !SAFE_DATA_IMAGE.test(next.src)) {
          delete next.src;
        }

        if (tagName === "a") {
          const target = next.target;
          if (target && target !== "_blank" && target !== "_self") delete next.target;
          if (target === "_blank") next.rel = secureRel(next.rel);
        }

        // GFM task lists are display-only, never forms.
        if (tagName === "input") next.disabled = "";

        return { tagName, attribs: next };
      },
    },
  });
}

export function isQuillBody(body: string) {
  return body.trimStart().startsWith("<");
}

/** Convert a stored post body (Quill HTML or Markdown) to sanitized HTML. */
export function renderPostBodyHtml(body: string): string {
  const raw = isQuillBody(body) ? body : marked.parse(body, { async: false, gfm: true });
  return sanitizePostHtmlOnServer(raw);
}
