"use client";
import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
} from "@mui/material";
import SignInForm from "@/features/auth-form";
import { useRouter } from "next/navigation";
import Loader from "@/shared/utils/ui/loader";
import { discordDarkTheme } from "@/shared/utils/styling/darkTheme";


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