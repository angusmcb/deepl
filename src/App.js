import { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import TranslationResult from "./TranslationResult";
import Settings from "./Settings";
import SelectLanguage from "./SelectLanguage";

const storedApiKey = () => localStorage.getItem("DeeplKey") || "";

function App() {
  const [sourceText, setSourceText] = useState("");
  const [apiSettings, setApiSettings] = useState({
    auth_key: storedApiKey(),
    free_api: true,
  });
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const timerRef = useRef(null);
  //
  function changeDelay(dothis, param) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      dothis(param);
    }, 2000);
  }
  function setStoreSettings(newsettings) {
    localStorage.setItem("DeeplKey", newsettings.auth_key);
    setApiSettings(newsettings);
  }

  return (
    <>
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
            api_settings={apiSettings}
          />
          <TranslationResult
            sourceText={sourceText}
            label="French - More Formal"
            options={{
              target_lang: "FR",
              formality: "more",
            }}
            api_settings={apiSettings}
          />
        </div>
      </div>
      <button
        className="openSettingsButton"
        onClick={() => setSettingsDialogOpen(!settingsDialogOpen)}
      >
        Settings
      </button>
      <Settings
        settings={apiSettings}
        setSettings={setStoreSettings}
        dialogOpen={settingsDialogOpen}
        setDialogOpen={setSettingsDialogOpen}
      />
    </>
  );
}

export default App;
