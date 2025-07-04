'use client'
import { discordDarkTheme } from "@/shared/utils/styling/darkTheme";
import ProtectedRoute from "@/shared/utils/ui/protected-route";
import { ThemeProvider } from "@emotion/react";
import { useSearchParams } from "next/navigation";
import EditTaskForm from "@/features/edit-task-form/EditTaskForm";
import { useMemo } from "react";

export default function CreateTaskPage() {
  const searchParams = useSearchParams();

  const task = useMemo(() => {
    if (!searchParams) return null;

    const id = searchParams.get("id");
    const title = searchParams.get("title") || "";
    const description = searchParams.get("description") || "";
    const completed = searchParams.get("completed") === "true";
    const usersParam = searchParams.get("users");

    let users = [];
    try {
      users = usersParam ? JSON.parse(usersParam) : [];
    } catch (e) {
      console.error("Error parsing users JSON:", e);
    }

    if (!id) return null;

    return {
      id: Number(id),
      title,
      description,
      completed,
      users,
    };
  }, [searchParams]);

  return (
    <ProtectedRoute>
      <ThemeProvider theme={discordDarkTheme}>
        {task ? <EditTaskForm task={task} /> : <>Loading task data...</>}
      </ThemeProvider>
    </ProtectedRoute>
  );
}
