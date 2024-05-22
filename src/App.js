import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TranslationResult from "./TranslationResult";

import SelectLanguage from "./SelectLanguage";

function App() {
  const [sourceText, setSourceText] = useState("");
  const [timer, setTimer] = useState(null);

  function changeDelay(dothis, param) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        dothis(param);
      }, 300)
    );
  }

  return (
    <div className="App">
      <div className="InputContainer">
        Text to Translate <br />
        <textarea
          className="InputTextarea"
          onChange={(e) => {
            changeDelay(setSourceText, e.target.value);
          }}
          autoFocus={true}
          rows={20}
          cols={100}
        />
      </div>
      <div className="ResultContainer">
        <TranslationResult
          sourceText={sourceText}
          label="French - Less Formal"
          options={{
            target_lang: "FR",
            formality: "less",
          }}
        />
        <TranslationResult
          sourceText={sourceText}
          label="French - More Formal"
          options={{
            target_lang: "FR",
            formality: "more",
          }}
        />
      </div>
    </div>
  );
}

export default App;
