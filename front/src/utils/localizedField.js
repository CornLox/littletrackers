// Picks a language-suffixed field from a backend document.
//
// Our Mongoose documents store every text field twice, e.g. `title_el` and
// `title_en`. Given the base name ("title") and the active language ("en"),
// this returns the right one — and falls back to the Greek value when the
// requested language is missing or empty (some `_en` fields are optional).
//
//   localizedField(programme, "title", "en")  ->  programme.title_en
//   localizedField(programme, "title", "el")  ->  programme.title_el
export function localizedField(doc, field, lang) {
  if (!doc) return "";
  const value = doc[`${field}_${lang}`];
  if (value !== undefined && value !== null && value !== "") {
    return value;
  }
  return doc[`${field}_el`] ?? ""; // fall back to Greek
}

// Normalises whatever i18next reports down to one of our two supported codes,
// defaulting to Greek. Use with useTranslation(): resolveLang(i18n).
export function resolveLang(i18n) {
  return i18n.resolvedLanguage === "en" ? "en" : "el";
}
