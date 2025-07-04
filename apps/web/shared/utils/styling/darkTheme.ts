import { createTheme } from "@mui/material";

export const discordDarkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#18191c",
      paper: "#242629",
    },
    primary: {
      main: "#5865F2",
    },
    text: {
      primary: "#dcddde",
      secondary: "#72767d",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 10px rgba(0,0,0,0.7)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#2f3136",
            color: "#dcddde",
            borderRadius: 6,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#202225",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5865F2",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5865F2",
            borderWidth: 2,
          },
          "& .MuiInputLabel-root": {
            color: "#72767d",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#5865F2",
          },
          "& .MuiFormHelperText-root": {
            color: "#f04747",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 6,
          padding: "10px 0",
        },
      },
    },
  },
});