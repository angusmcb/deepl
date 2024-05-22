import { useState } from "react";
import "./TranslationResult.css";

import SelectLanguage from "./SelectLanguage";

const deeplKey = "b43153e4-b724-4181-b7d1-3bd902a1dd64:fx";
const translator = require("deepl");

async function translate(sourcetext, options) {
  const translationResult = await translator({
    ...options,
    free_api: true,
    text: sourcetext,
    auth_key: deeplKey,
    // All optional parameters available in the official documentation can be defined here as well.
  });
  return translationResult.data.translations[0].text;
}

export default function TranslationResult({ sourceText, label, options }) {
  const [translatedText, setTranslatedText] = useState();

  translate(sourceText, options ? options : {}).then((result) => {
    setTranslatedText(result);
  });

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
