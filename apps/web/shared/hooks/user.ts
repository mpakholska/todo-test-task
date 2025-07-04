import { useCallback, useState } from "react";
import { User } from "../types/auth";
import { getAllUsers } from "../services/user";

export function useUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<User[]>([]);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers();
      setData(response);
      return response;
    } catch (e) {
      setError(e as Error);
      return null;
    } finally {
      setLoading(false);
    }
  
  }, []);
  return { fetch, loading, error, data };
}
