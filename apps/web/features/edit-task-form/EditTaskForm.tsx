"use client";

import { useUsers } from "@/shared/hooks/user";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export type User = {
  id: number;
  login: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  users: User[];
};

type EditTaskFormProps = {
  task: Task;
};

export default function EditTaskForm({ task }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [assignedUserIds, setAssignedUserIds] = useState<number[]>(
    task.users.map((u) => u.id)
  );

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const { data: users, fetch } = useUsers();

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    toast.success("Task updated!");
  };

  const handleUserChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[];
    setAssignedUserIds(value);
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#202225",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4}}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ color: "#fff", fontWeight: 700 }}
        >
          Edit Task
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                sx={{ color: "#5865F2" }}
              />
            }
            label="Completed"
            sx={{ mt: 1, color: "#dcddde" }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="assign-users-label" sx={{ color: "#72767d" }}>
              Assign Users
            </InputLabel>
            <Select
              labelId="assign-users-label"
              multiple
              value={assignedUserIds}
              onChange={handleUserChange}
              input={<OutlinedInput label="Assign Users" />}
              renderValue={(selected) =>
                selected
                  .map((id) => users.find((u) => u.id === id)?.login)
                  .join(", ")
              }
              sx={{
                backgroundColor: "#2f3136",
                color: "#dcddde",
              }}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <Checkbox checked={assignedUserIds.includes(user.id)} />
                  <Typography sx={{ ml: 1 }}>{user.login}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
