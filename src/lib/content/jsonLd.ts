/** Serialize data inside a JSON-LD script without allowing HTML tag breakouts. */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
