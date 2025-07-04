import $api from "../utils/api";

export async function getAllTasks() {
  try {
    const response = await $api.get("/task");
    return response.data;
  } catch {
    throw new Error("Error fetching tasks");
  }
}

export async function createTask(title: string, description: string) {
  try {
    const response = await $api.post("/task", {title, description});
    return response.data;
  } catch {
    throw new Error("Error creating task");
  }
}

export async function editTask(
  id: number,
  title?: string,
  description?: string,
  completed?: boolean
) {
  try {
    const values: {
      title?: string;
      description?: string;
      completed?: boolean;
    } = {};

    if (title) {
      values.title = title;
    }

    if (description) {
      values.description = description;
    }

    if (completed) {
      values.completed = completed;
    }

    const response = await $api.post("/task/edit", { ...values, id });
    return response.data;
  } catch {
    throw new Error("Error editing task");
  }
}

export async function assignTask(login: string, taskId: number) {
  try {
    const response = await $api.post("/task/assign", { login, taskId });
    return response.data;
  } catch {
    throw new Error("Error assigning task");
  }
}

export async function completeTask(completed: boolean) {
  try {
    const response = await $api.post("/task/edit", { completed });
    return response.data;
  } catch {
    throw new Error("Error completing");
  }
}
