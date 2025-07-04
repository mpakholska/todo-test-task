import { useLogin, useRegister } from "@/shared/hooks/auth";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignInForm() {
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ login?: string; password?: string }>(
    {}
  );

  const [isLogin, setIsLogin] = useState(true);

  const {login: login, loading: loadingLogin} = useLogin();
  const {register, loading: loadingRegister} = useRegister()

  const validate = () => {
    const newErrors: { login?: string; password?: string } = {};
    if (!loginValue.trim()) {
      newErrors.login = "Login is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
  
    let result={};
  
    if (isLogin) {
      result = await login(loginValue, password);
      if (!result) {
        toast.error("Login failed. Please check your credentials.");
      }
    } else {
      result = await register(loginValue, password);
      if (!result) {
        toast.error("Registration failed. Please try again.");
      }
    }
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
        {isLogin? "Sign In": "Sign Up"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Login"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
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
          disabled={loadingLogin || loadingRegister}
        >
          {isLogin? "Sign In": "Sign Up"}
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
            {isLogin? "Don`t have an account?": "Already have an account"}
          </Typography>

          <Typography
            align="center"
            sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
            onClick={()=>setIsLogin(!isLogin)}
          >
            {isLogin? "Register": "Login"}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
