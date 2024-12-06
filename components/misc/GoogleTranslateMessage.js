export default function GoogleTranslateMessage({
  check,
  local,
  englishText,
  currentText
}) {

  if (
    check === "Google Translated" &&
    local !== "en" &&
    englishText !== currentText
  ) {
    return (
      <>
        {" "}
        <p className="text-xs">Google Translated</p>
      </>
    );
  } else {
    return <></>;
  }
}
