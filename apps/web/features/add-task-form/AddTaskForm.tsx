"use client";

import { useCreateTask } from "@/shared/hooks/task";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const {create, loading, error } = useCreateTask()

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const response = await create(title, description);
    if(error){
      toast.error("Error creating task");
    }

    if(response){
      toast.success("Task created successfully");
    }
    setTitle("");
    setDescription("");
    setErrors({});
  };

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
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: "#2f3136",
          border: "1px solid #202225",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#dcddde", fontWeight: 600, mb: 2 }}
        >
          Add New Task
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            sx={fieldStyles}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            sx={{ ...fieldStyles, mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "#5865F2",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 1,
              py: 1.2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
              "&:hover": {
                backgroundColor: "#4752C4",
              },
            }}
          >
            Create Task
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

const fieldStyles = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#1e1f22",
    color: "#dcddde",
    borderRadius: 1,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#202225",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#5865F2",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#5865F2",
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
};
