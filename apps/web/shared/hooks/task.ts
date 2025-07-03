import { useCallback, useState } from "react";
import {
  assignTask,
  completeTask,
  createTask,
  editTask,
  getAllTasks,
} from "../services/task";
import { Task } from "../types/task";

export function useTasks() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Task[]>([]);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllTasks();
      setData(response.data);
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

export function useCreateTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = useCallback(async (title: string, description: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createTask(title, description);
      return response;
    } catch (e) {
      setError(e as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

export function useEditTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const edit = useCallback(
    async (title?: string, description?: string, completed?: boolean) => {
      setLoading(true);
      setError(null);
      try {
        const response = await editTask(title, description, completed);
        return response;
      } catch (e) {
        setError(e as Error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { edit, loading, error };
}

export function useAssignTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const assign = useCallback(async (login: string, taskId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await assignTask(login, taskId);
      return response;
    } catch (e) {
      setError(e as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { assign, loading, error };
}

export function useChangeTaskStatus() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
  
    const changeStatus = useCallback(async (completed: boolean) => {
      setLoading(true);
      setError(null);
      try {
        const response = await completeTask(completed);
        return response;
      } catch (e) {
        setError(e as Error);
        return null;
      } finally {
        setLoading(false);
      }
    }, []);
  
    return { changeStatus, loading, error };
  }

