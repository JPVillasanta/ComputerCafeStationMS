import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
    const navigate = useNavigate();

    function navClass({ isActive }) {
        return isActive
            ? "rounded bg-blue-600 px-3 py-2 text-white"
            : "rounded px-3 py-2 hover:bg-slate-200";
    }

    function logout() {
        localStorage.removeItem("cafe_authenticated");
        navigate("/login", { replace: true });
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <nav className="border-b bg-white shadow-sm">
                <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
                    <h1 className="text-xl font-bold text-blue-700">
                        Computer Café
                    </h1>

                    <div className="flex items-center gap-2">
                        <NavLink to="/" end className={navClass}>
                            Home
                        </NavLink>

                        <NavLink to="/stations" end className={navClass}>
                            Station List
                        </NavLink>

                        <NavLink to="/stations/create" className={navClass}>
                            Add Station
                        </NavLink>

                        <button
                            type="button"
                            onClick={logout}
                            className="rounded bg-red-600 px-3 py-2 text-white"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <Outlet />
        </div>
    );
}
