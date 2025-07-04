import { useState, useCallback } from "react";
import { loginUser, logoutUser, registerUser } from "../services/auth";

export function useRegister() {
  const [loading, setLoading] = useState(false);

  const register = useCallback(async (login: string, password: string) => {
    setLoading(true);
    try {
      const response = await registerUser(login, password);

      console.log(response);

      if (!response) {
        throw new Error("No response received");
      }

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.token) {
        localStorage.setItem("token", response.token);
        return response.token;
      } else {
        throw new Error("No token received");
      }
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { register, loading };
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = useCallback(async (login: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(login, password);

      if (!response) {
        throw new Error("No response received");
      }

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.token) {
        localStorage.setItem("token", response.token);
        return response.token;
      } else {
        throw new Error("No token received");
      }
    } catch (e) {
      console.log(e);
      setError(e as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading, error };
}

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await logoutUser();
      localStorage.removeItem("token");
      return response.data;
    } catch (e) {
      setError(e as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { logout, loading, error };
}