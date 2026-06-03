/** Escape user-controlled strings before embedding in HTML email bodies. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape HTML and preserve line breaks for multiline fields. */
export function escapeHtmlMultiline(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br>");
}

/** Strip characters that can break or inject email headers in subject lines. */
export function sanitizeEmailSubject(value: string): string {
  return value.replace(/[\r\n\u0000]/g, " ").trim();
}
