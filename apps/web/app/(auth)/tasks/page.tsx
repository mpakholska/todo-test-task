"use client";

import AddTaskForm from "@/features/add-task-form/AddTaskForm";
import TasksList from "@/features/tasks-list";
import { discordDarkTheme } from "@/shared/utils/styling/darkTheme";
import NavBar from "@/widgets/navbar";

import { ThemeProvider } from "@mui/material";

export default function DarkLoginPage() {
  return (
    <ThemeProvider theme={discordDarkTheme}>
      <NavBar />
      <AddTaskForm />
      <TasksList />
    </ThemeProvider>
  );
}
