const ANIMATED_SUPABASE_IMAGE_IDS = new Set([
  "1747995748559",
  "1747983130757",
  "1747987828131",
  "1747984646422",
]);

export function isKnownAnimatedSupabaseImage(src: string) {
  if (!src.startsWith("http")) return false;

  try {
    const url = new URL(src);
    if (url.hostname !== "evcsbwqeetfvegvrtbny.supabase.co") return false;
    const fileId = url.pathname.split("/").pop();
    if (!fileId) return false;

    return ANIMATED_SUPABASE_IMAGE_IDS.has(fileId);
  } catch {
    return false;
  }
}
