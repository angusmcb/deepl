import "./Settings.css";
import { useState } from "react";

export default function Settings({
  settings,
  setSettings,
  dialogOpen,
  setDialogOpen,
}) {
  function updateKey(key) {
    setSettings({ ...settings, auth_key: key });
  }
  return (
    <dialog open={dialogOpen} className="SettingsDialog">
      <label>
        API Key:
        <input
          type="password"
          name="API Key"
          value={settings.auth_key}
          onChange={(e) => updateKey(e.target.value)}
        />
      </label>
      <button
        onClick={() => {
          setDialogOpen(false);
        }}
      >
        Done
      </button>
    </dialog>
  );
}
