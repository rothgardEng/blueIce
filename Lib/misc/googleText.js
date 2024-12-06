export default function googleText(check, locale, englishText, currentText) {
  if (
    check === "Google Translated" &&
    locale !== "en" &&
    englishText !== currentText
  ) {
    return " (Google Translated)";
  } else {
    return "";
  }
}
