"use client";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { useLogout } from "@/shared/hooks/auth";
import ProtectedRoute from "@/shared/utils/ui/protected-route";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  const { logout, loading } = useLogout();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const goToTasks = () => {
    router.push("/tasks");
  };

  return (
    <ProtectedRoute>
      <Box sx={{ flexGrow: 1, position: "fixed", top: 0, left: 0, right: 0 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My App
            </Typography>
            <Button color="inherit" onClick={goToTasks}>
              Tasks
            </Button>
            <Link href="/tasks/create">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#5865F2",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                px: 3,
                py: 1,
                ml: 2,
                mr: 2,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#4752C4",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.6)",
                },
              }}
              disabled={loading}
            >
              Create Task
            </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{
                backgroundColor: "gray",
                color: "white",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                px: 3,
                py: 1,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "darkgray",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.6)",
                },
              }}
              disabled={loading}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ProtectedRoute>
  );
}
