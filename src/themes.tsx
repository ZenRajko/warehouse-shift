import React, { useEffect, useState } from "react";
import { useConfig } from "./config";

export type ThemesProps = {
  onThemeChange: (value: string | undefined) => void;
};

const Themes: React.FC<ThemesProps> = ({ onThemeChange }) => {
  const config = useConfig();
  const [theme, setTheme] = useState<string | undefined>();

  useEffect(() => {
    if (config?.theme) setTheme(config.theme);
  }, [config]);

  const buttonClicked = (newTheme: string) => {
    if (newTheme) {
      setTheme(newTheme);
      onThemeChange(newTheme);
    }
  };

  return (
    <div className="themes">
      {config?.themes && Object.values(config.themes).map(t => (
        <button key={t}
          onClick={(e) => { e.stopPropagation(); buttonClicked(t); }}
          className={theme === t ? "theme-selected" : ""}>
          {t}
        </button>
      ))}
    </div>
  );
};

export default Themes;