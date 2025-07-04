"use client";
import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
} from "@mui/material";
import SignInForm from "@/features/auth-form";
import { useRouter } from "next/navigation";
import Loader from "@/shared/utils/ui/loader";

const discordDarkTheme = createTheme({
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

const LoadingComponent = () => (
  <Loader />
);

export default function DarkLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          router.replace("/tasks");
          return;
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isClient, router]);

  if (isLoading) {
    return (
      <ThemeProvider theme={discordDarkTheme}>
        <CssBaseline />
        <LoadingComponent />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={discordDarkTheme}>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ height: "100vh" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          px={2}
        >
          <SignInForm />
        </Box>
      </Container>
    </ThemeProvider>
  );
}