import { useEffect, useState } from "react";

import { me } from "./api/auth.api";

import { useAuthStore } from "./store/auth.store";

import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const token = useAuthStore(
    (state) => state.token
  );

  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await me();

        setUser(res.data.data);
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: 100,
        }}
      >
        Loading...
      </h2>
    );
  }

  return <AppRoutes />;
}