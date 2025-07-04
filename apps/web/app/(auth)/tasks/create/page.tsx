"use client";

import AddTaskForm from "@/features/add-task-form/AddTaskForm";
import { discordDarkTheme } from "@/shared/utils/styling/darkTheme";
import ProtectedRoute from "@/shared/utils/ui/protected-route";
import { ThemeProvider } from "@emotion/react";

export default function CreateTaskPage() {
  return (
    <ProtectedRoute>
    <ThemeProvider theme={discordDarkTheme}>
      <AddTaskForm />
    </ThemeProvider>
    </ProtectedRoute>
  );
}
