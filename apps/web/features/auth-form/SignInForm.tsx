import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function SignInForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ login?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: { login?: string; password?: string } = {};
    if (!login.trim()) {
      newErrors.login = "Login is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ color: "#fff", fontWeight: 700 }}
      >
        Sign In
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Login"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          autoFocus
          error={!!errors.login}
          helperText={errors.login}
          inputProps={{ "data-testid": "login-input" }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          inputProps={{ "data-testid": "password-input" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          data-testid="submit-button"
        >
          Sign In
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography
            align="center"
            sx={{ mt: 2, cursor: "pointer", color: "white" }}
          >
            Don`t have an account?
          </Typography>

          <Typography
            align="center"
            sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
          >
            Register
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
