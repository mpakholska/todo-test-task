"use client";

import { useAssignTask, useEditTask } from "@/shared/hooks/task";
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
  const [assignedUserLogin, setAssignedUserLogin] = useState<string>(
    task.users.length > 0 ? task.users[0].login : ""
  );

  const [assignedUsers, setAssignedUsers] = useState<User[]>(task.users);

  const { assign } = useAssignTask();
  const { edit } = useEditTask();

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const { data: users, fetch } = useUsers();

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";

    const hasChanged =
      title !== task.title ||
      description !== task.description ||
      completed !== task.completed ||
      JSON.stringify(assignedUsers) !== JSON.stringify(task.users);

    if (!hasChanged) {
      toast.error("The fields are the same as they were before!");
      return;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const response = await edit( task.id,title, description, completed);
    if (response) {
      toast.success("Task updated!");
    } else {
      toast.error("Error editing task");
    }
  };

  const handleUserChange = async (event: SelectChangeEvent<string>) => {
    const response = await assign(event.target.value, task.id);
    if (response) {
      setAssignedUserLogin(event.target.value);
      setAssignedUsers((prev) => [...prev, { login: event.target.value }]);
    } else {
      toast.error("Error assigning task");
    }
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
        pt: 10,
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, height: "80vh", overflowY: "auto" }}
      >
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

          <Box
            sx={{
              mt: 1,
              mb: 2,
              p: 1,
              backgroundColor: "rgba(114, 118, 125, 0.3)",
              borderRadius: 1,
              maxHeight: 120,
              overflow: "auto",
            }}
          >
            {assignedUsers.length > 0 ? (
              assignedUsers.map((item) => (
                <Typography
                  key={item.login}
                  variant="body2"
                  sx={{
                    fontSize: "0.8rem",
                    color: "#dcddde",
                    p: 0.5,
                    "&:not(:last-child)": {
                      borderBottom: "1px solid rgba(114, 118, 125, 0.5)",
                    },
                  }}
                >
                  {item.login}
                </Typography>
              ))
            ) : (
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.8rem",
                  color: "#72767d",
                  fontStyle: "italic",
                  p: 0.5,
                }}
              >
                No users assigned
              </Typography>
            )}
          </Box>

          <FormControl fullWidth margin="normal">
            <InputLabel id="assign-user-label" sx={{ color: "#72767d" }}>
              Assign User
            </InputLabel>
            <Select
              labelId="assign-user-label"
              value={assignedUserLogin}
              onChange={handleUserChange}
              input={<OutlinedInput label="Assign User" />}
              renderValue={(selected) => selected || <em>No user selected</em>}
              sx={{
                backgroundColor: "#2f3136",
                color: "#dcddde",
                "& .MuiSelect-icon": {
                  color: "#dcddde",
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {users?.map((user) => (
                <MenuItem
                  key={user.login}
                  value={user.login}
                  sx={{
                    backgroundColor:
                      assignedUserLogin === user.login
                        ? "#5865F255"
                        : "inherit",
                    "&:hover": {
                      backgroundColor: "#5865F233",
                    },
                  }}
                >
                  {user.login}
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
