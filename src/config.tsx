import React, { createContext, useContext, useEffect, useState } from "react";

interface Config {
    theme: string;
    themes: string[];
}

const ConfigContext = createContext<Config | null>(null);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<Config | null>(null);

    useEffect(() => {
        // Use PUBLIC_URL environment variable for correct path on GitHub Pages
        const publicUrl = process.env.PUBLIC_URL || "";
        fetch(`${publicUrl}/config.json`)
            .then(response => response.json())
            .then(data => setConfig(data))
            .catch(error => console.error("Error loading config:", error));
    }, []);

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    return useContext(ConfigContext);
};
