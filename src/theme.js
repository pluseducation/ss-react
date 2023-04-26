import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#cfcfd1",
          200: "#9f9fa2",
          300: "#6e7074",
          400: "#3e4045", // 3e4045
          500: "#0e1017", // 0e1017
          600: "#0b0d12",
          700: "#080a0e",
          800: "#060609",
          900: "#030305"
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#deedff",
          200: "#bcdbff",
          300: "#9bcaff",
          400: "#79b8ff",
          500: "#58a6ff",
          600: "#4685cc",
          700: "#356499",
          800: "#234266",
          900: "#122133"
      },
        purpleAccent: {
          100: "#e4d8f4",
          200: "#c9b2e8",
          300: "#af8bdd",
          400: "#9465d1",
          500: "#793ec6",
          600: "#61329e",
          700: "#492577",
          800: "#30194f",
          900: "#180c28"
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          // 100: "#040509",
          // 200: "#080b12",
          // 300: "#0c101b",
          // 400: "#f2f0f0", 
          // 500: "#f2f0f0", // manually changed
          // 600: "#1F2A40",
          // 700: "#727681",
          // 800: "#a1a4ab",
          // 900: "#d0d1d5",

          100: "#030305",
          200: "#060609",
          300: "#080a0e",
          400: "#f2f0f0", // 3e4045
          500: "#f2f0f0", // 0e1017
          600: "#3e4045",
          700: "#6e7074",
          800: "#9f9fa2",
          900: "#cfcfd1"
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#122133",
          200: "#234266",
          300: "#356499",
          400: "#4685cc",
          500: "#58a6ff",
          600: "#79b8ff",
          700: "#9bcaff",
          800: "#bcdbff",
          900: "#deedff",
        },
        purpleAccent: {
          100: "#180c28",
          200: "#30194f",
          300: "#492577",
          400: "#61329e",
          500: "#793ec6",
          600: "#9465d1",
          700: "#af8bdd",
          800: "#c9b2e8",
          900: "#e4d8f4"
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.purpleAccent[500],
            },
            secondary: {
              main: colors.blueAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[700],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.purpleAccent[400],
            },
            secondary: {
              main: colors.blueAccent[400],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiTextField: {
        defaultProps : {
        fullWidth : true,
        variant: "outlined",
        size: "small"
        },
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              // background: "#ffffff"
            }
          }
        },
      },
      MuiSelect: {
        defaultProps: {
          fullWidth : true,
          variant: "outlined",
          size: "small"
        },
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              // background: "#ffffff"
            }
          }
        }
      }
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
