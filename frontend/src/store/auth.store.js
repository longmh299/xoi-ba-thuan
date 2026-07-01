import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,

  token: localStorage.getItem("accessToken"),

  setAuth(user, token) {
    localStorage.setItem("accessToken", token);

    set({
      user,
      token,
    });
  },

  logout() {
    localStorage.removeItem("accessToken");

    set({
      user: null,
      token: null,
    });
  },

  setUser(user) {
    set({
      user,
    });
  },
}));