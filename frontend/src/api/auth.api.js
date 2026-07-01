import api from "./axios";

export function login(data) {
  return api.post("/auth/login", data);
}

export function register(data) {
  return api.post("/auth/register", data);
}

export function me() {
  return api.get("/auth/me");
}