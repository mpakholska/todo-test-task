"use client";

import TaskCard from "@/entities/task-card/TaskCard";
import { useTasks } from "@/shared/hooks/task";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";

export default function TasksList() {
  const { loading, data: tasks, error, fetch } = useTasks();

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress sx={{ color: "#72767d" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        Failed to load tasks.
      </Typography>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Typography color="text.secondary" align="center" mt={4}>
        No tasks found.
      </Typography>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      mt={2}
      sx={{ background: "#2f3136", mt: 15, ml: 10, mr: 10, mb: 10 }}
    >
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          users={task.users as never}
        />
      ))}
    </Box>
  );
}
