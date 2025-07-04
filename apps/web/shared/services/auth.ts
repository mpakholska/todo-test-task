import $api from "../utils/api";

export async function registerUser(login: string, password: string) {
  try {
    const response = await $api.post("/auth/register", { login, password });
    return response.data;
  } catch {
    throw new Error("Error registering user");
  }
}

export async function loginUser(login: string, password: string) {
  try {
    const response = await $api.post("/auth/login", { login, password });
    return response.data;
  } catch {
    throw new Error("Error during login");
  }
}

export async function logoutUser() {
  try {
    const response = await $api.get("/auth/logout");
    return response.data;
  } catch {
    throw new Error("Error during logout");
  }
}
