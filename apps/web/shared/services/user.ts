import $api from "../utils/api";

export async function getAllUsers() {
    try {
      const response = await $api.get("/users");
      return response.data;
    } catch {
      throw new Error("Error fetching users");
    }
  }