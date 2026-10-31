// Fills {{key}} placeholders in a text with the visitor's own values.
// Pure function: no DOM, no storage, easy to test.

/**
 * @param {string} template text with {{key}} placeholders
 * @param {Record<string, string>} values the visitor's values by key
 * @param {Record<string, string>} [labels] human labels by key, used for missing values
 * @returns {{ text: string, missing: string[] }}
 */
export function fillTemplate(template, values, labels = {}) {
  const missing = [];
  const text = template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = String(values?.[key] ?? "").trim();
    if (value) return value;
    if (!missing.includes(key)) missing.push(key);
    return `[${labels[key] ?? key}]`;
  });
  return { text, missing };
}
