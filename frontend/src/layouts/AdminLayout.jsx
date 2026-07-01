import { useState } from "react";

import AdminHeader from "../components/layout/AdminHeader";
import AdminDrawer from "../components/layout/AdminDrawer";

export default function AdminLayout({
    children,
}) {
    const [drawerOpen, setDrawerOpen] =
        useState(false);

    return (
        <div className="h-screen bg-slate-100 flex flex-col overflow-hidden">

            <AdminHeader
                onMenuClick={() =>
                    setDrawerOpen(true)
                }
            />

            <AdminDrawer
                open={drawerOpen}
                onClose={() =>
                    setDrawerOpen(false)
                }
            />

            <main
                className="
                    flex-1
                    max-w-md
                    mx-auto
                    w-full
                    overflow-hidden
                    p-4
                "
            >
                {children}
            </main>

        </div>
    );
}