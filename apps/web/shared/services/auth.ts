import $api from "../utils/api";

export async function registerUser(login: string, password: string) {
  try {
    const response = await $api.post("/auth/register", { login, password });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function loginUser(login: string, password: string) {
  try {
    const response = await $api.post("/auth/login", { login, password });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function logoutUser() {
  try {
    const response = await $api.get("/auth/logout");
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
