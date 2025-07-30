export const themes = {
  dark: {
    name: "Dark",
    colors: {
      primary: "#00d4aa",
      primaryHover: "#00b894",
      secondary: "#1e293b",
      accent: "#3b82f6",
      background: "#0f172a",
      surface: "#1e293b",
      border: "#334155",
      text: "#f8fafc",
      textSecondary: "#94a3b8",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6"
    },
    gradients: {
      primary: "linear-gradient(135deg, #00d4aa 0%, #3b82f6 100%)",
      secondary: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
      accent: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
    }
  },
  light: {
    name: "Light",
    colors: {
      primary: "#00d4aa",
      primaryHover: "#00b894",
      secondary: "#f1f5f9",
      accent: "#3b82f6",
      background: "#ffffff",
      surface: "#f8fafc",
      border: "#e2e8f0",
      text: "#0f172a",
      textSecondary: "#64748b",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6"
    },
    gradients: {
      primary: "linear-gradient(135deg, #00d4aa 0%, #3b82f6 100%)",
      secondary: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      accent: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
    }
  },
  ocean: {
    name: "Ocean",
    colors: {
      primary: "#0891b2",
      primaryHover: "#0e7490",
      secondary: "#0c4a6e",
      accent: "#06b6d4",
      background: "#0f172a",
      surface: "#1e293b",
      border: "#334155",
      text: "#f8fafc",
      textSecondary: "#94a3b8",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#06b6d4"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
      secondary: "linear-gradient(135deg, #0c4a6e 0%, #1e293b 100%)",
      accent: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
    }
  },
  sunset: {
    name: "Sunset",
    colors: {
      primary: "#f97316",
      primaryHover: "#ea580c",
      secondary: "#7c2d12",
      accent: "#f59e0b",
      background: "#1c1917",
      surface: "#292524",
      border: "#44403c",
      text: "#fafaf9",
      textSecondary: "#a8a29e",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#f97316"
    },
    gradients: {
      primary: "linear-gradient(135deg, #f97316 0%, #f59e0b 100%)",
      secondary: "linear-gradient(135deg, #7c2d12 0%, #292524 100%)",
      accent: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)"
    }
  }
};

export const getThemeColors = (themeName) => {
  return themes[themeName] || themes.dark;
};

export const applyTheme = (themeName) => {
  const theme = getThemeColors(themeName);
  const root = document.documentElement;
  
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  Object.entries(theme.gradients).forEach(([key, value]) => {
    root.style.setProperty(`--gradient-${key}`, value);
  });
}; 