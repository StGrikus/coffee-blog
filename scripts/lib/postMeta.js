import slugify from "slugify";

export function titleFromFilename(filename) {
  const base = filename.replace(/\.md$/i, "").trim();
  const match = base.match(/^(\d+)-(.*)$/);
  if (match) {
    const num = parseInt(match[1], 10);
    const slug = match[2].replace(/-/g, " ").trim();
    const text = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "";
    return text ? `${num} ${text}` : String(num);
  }
  const fallback = base.replace(/-/g, " ").trim();
  return fallback ? fallback.charAt(0).toUpperCase() + fallback.slice(1) : base;
}

export function isImageLine(line) {
  const t = line.trim();
  return /^\s*!\[[^\]]*\]\([^)]+\)\s*$/.test(t) || /<img[^>]+src=/.test(t);
}

function destFromMarkdownImage(dest) {
  const t = String(dest || "").trim();
  if (!t) return "";
  // `url "title"` / `<url>` — do not leak the title into og:image.
  const unangled = t.replace(/^<|>$/g, "").trim();
  const url = unangled.match(/^([^\s]+)/);
  return url ? url[1].trim() : "";
}

export function extractFirstImageUrl(content) {
  const mdMatch = content.match(/!\[[^\]]*\]\(([^)]+)\)/);
  if (mdMatch) {
    const url = destFromMarkdownImage(mdMatch[1]);
    if (url) return url;
  }
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);
  if (imgMatch) return imgMatch[1].trim();
  return null;
}

const YOUTUBE_WATCH = /https:\/\/(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/;
const YOUTUBE_SHORT = /https:\/\/youtu\.be\/([A-Za-z0-9_-]{11})/;
const YOUTUBE_SHORTS = /https:\/\/(?:www\.)?youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/;

const YOUTUBE_EMBED = /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/;

export function extractFirstYouTubeId(content) {
  const m1 = content.match(YOUTUBE_WATCH);
  if (m1) return m1[1];
  const m2 = content.match(YOUTUBE_SHORT);
  if (m2) return m2[1];
  const m3 = content.match(YOUTUBE_SHORTS);
  if (m3) return m3[1];
  const m4 = content.match(YOUTUBE_EMBED);
  if (m4) return m4[1];
  return null;
}

const SOUNDCLOUD_TRACK = /https:\/\/(?:(?:www|m)\.)?soundcloud\.com\/[^\s"'<>)]+/i;
const SOUNDCLOUD_SHORT = /https:\/\/on\.soundcloud\.com\/[^\s"'<>)]+/i;

function trimUrlJunk(url) {
  return String(url || "").replace(/[.,;:]+$/g, "");
}

export function extractFirstSoundCloudUrl(content) {
  const text = String(content || "");
  const short = text.match(SOUNDCLOUD_SHORT);
  const track = text.match(SOUNDCLOUD_TRACK);
  const matches = [short, track]
    .filter(Boolean)
    .sort((a, b) => a.index - b.index);
  if (!matches.length) return null;
  const url = trimUrlJunk(matches[0][0]);
  if (/soundcloud\.com\/(?:explore|discover|you|pages)\b/i.test(url)) return null;
  return url;
}

export function extractFirstVideoUrl(content) {
  const mdLink = content.match(/\[[^\]]*\]\(([^)]+\.(?:mp4|webm|mov))(?:\?[^)]*)?\)/i);
  if (mdLink) return mdLink[1].trim();
  const bare = content.match(/^(https?:\/\/\S+\.(?:mp4|webm|mov))(?:\?\S+)?$/im);
  if (bare) return bare[1].trim();
  const htmlVideo = content.match(/<video[^>]*>\s*<source[^>]+src=["']([^"']+)["']/i);
  if (htmlVideo) return htmlVideo[1].trim();
  return null;
}

function stripHtml(s) {
  return s.replace(/<[^>]*>/g, "");
}

function isBareUrlLine(line) {
  return /^https?:\/\/\S+$/i.test(line.trim());
}

function isYouTubeLine(line) {
  const t = line.trim();
  return YOUTUBE_WATCH.test(t) || YOUTUBE_SHORT.test(t) || YOUTUBE_SHORTS.test(t);
}

export function extractTitleFromContentOrFilename(content, filename) {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) return titleMatch[1].trim();
  return titleFromFilename(filename);
}

export function makeSlug({ content, filename }) {
  const fileBase = filename.replace(/\.md$/i, "").trim();
  // Numbered posts keep filename slugs so UA/RU pairs and in-post links stay stable
  // (Cyrillic H1 titles would otherwise transliterate to a different URL).
  if (/^\d+/.test(fileBase)) {
    const fromFile = slugify(fileBase, { lower: true, strict: true, trim: true }) || fileBase.toLowerCase();
    return (fromFile || "post").slice(0, 80);
  }
  const title = extractTitleFromContentOrFilename(content, filename);
  const raw = (title || fileBase || "").toString();
  const s = slugify(raw, { lower: true, strict: true, trim: true });
  if (s && /[a-z]/i.test(s) && s.length > 2) return s.slice(0, 80);
  const fromFile = slugify(fileBase, { lower: true, strict: true, trim: true }) || fileBase;
  return (fromFile || "post").slice(0, 80);
}

function isChromeLine(line) {
  const t = line.trim();
  if (!t) return true;
  if (t.startsWith("<!--")) return true;
  if (t.startsWith("|")) return true;
  if (/^<\/?[a-z]/i.test(t)) return true;
  // Language switchers and series nav: [UA/RU], [Часть 1 | Часть 2]
  if (/^\[[^\]]*(?:UA|RU|Часть|Частина)/i.test(t)) return true;
  if (/^\[<a\b/i.test(t)) return true;
  if (/^(?:Часть|Частина)\s*\d/i.test(t)) return true;
  return false;
}

export function extractExcerpt(content, excerptLength) {
  const lines = content.split("\n");
  const titleIndex = lines.findIndex((line) => line.startsWith("# "));
  const afterTitle = titleIndex >= 0 ? titleIndex + 1 : 0;
  const contentLines = lines.slice(afterTitle);
  const firstParagraph = contentLines.find(
    (line) =>
      line.trim() &&
      !line.startsWith("#") &&
      !isImageLine(line) &&
      !isBareUrlLine(line) &&
      !isYouTubeLine(line) &&
      !isChromeLine(line),
  );
  if (!firstParagraph) return "";
  return stripHtml(firstParagraph)
    .trim()
    .substring(0, excerptLength)
    .replace(/\*\*/g, "")
    .replace(/^\[([^\]]+)\]\([^)]+\)/, "$1");
}

