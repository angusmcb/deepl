import { useState } from "react";
import "./TranslationResult.css";

import SelectLanguage from "./SelectLanguage";

const translator = require("deepl");

async function translate(sourcetext, options, api_settings) {
  const translationResult = await translator({
    ...api_settings,
    ...options,
    text: sourcetext,
  }).catch((err) => {
    return "";
  });

  return translationResult.data.translations[0].text;
}

export default function TranslationResult({
  sourceText,
  label,
  options,
  api_settings,
}) {
  const [translatedText, setTranslatedText] = useState("");
  const [existingSourceText, setExistingSourceText] = useState("");

  if (sourceText && existingSourceText !== sourceText) {
    setExistingSourceText(sourceText);
    translate(sourceText, options ? options : {}, api_settings).then(
      (result) => {
        setTranslatedText(result);
      }
    );
  }

  return (
    <div className="ResultContainer">
      <label className="ResultLabel">
        {label}
        <br />

        <textarea
          value={translatedText}
          readOnly={true}
          rows={20}
          cols={100}
          className="ResultTextarea"
        />
      </label>
      <button
        className="CopyButton"
        onClick={() => {
          navigator.clipboard.writeText(translatedText);
        }}
      >
        &#128203;
      </button>
    </div>
  );
}
