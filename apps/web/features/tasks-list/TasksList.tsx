"use client";

import TaskCard from "@/entities/task-card/TaskCard";
import { useTasks } from "@/shared/hooks/task";
import { Task } from "@/shared/types/task";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function TasksList() {
  const { loading, data: tasks, error, fetch } = useTasks();

  const router = useRouter();

  const handleEdit = (item: Task) => {
    const task = {
      id: item.id.toString(),
      title: item.title,
      description: item.description,
      completed: item.completed.toString(),
      users: JSON.stringify(item.users),
    };

    const params = new URLSearchParams(task).toString();
    router.push(`/tasks/edit?${params}`);
  };

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
          id={task.id}
          key={task.id}
          title={task.title}
          completed={task.completed}
          description={task.description}
          users={task.users as never}
          onEdit={()=>handleEdit(task)}
        />
      ))}
    </Box>
  );
}
