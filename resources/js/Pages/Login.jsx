import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const isAuthenticated =
        localStorage.getItem("cafe_authenticated") === "true";

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    function submitLogin(event) {
        event.preventDefault();
        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Username and password are required.");

            return;
        }

        if (username !== "cafe_admin" || password !== "pccafe2026") {
            setError("Invalid username or password.");

            return;
        }

        localStorage.setItem("cafe_authenticated", "true");

        navigate("/", { replace: true });
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
            <form
                onSubmit={submitLogin}
                className="w-full max-w-md rounded-lg bg-white p-8 shadow"
            >
                <h1 className="mb-2 text-3xl font-bold">Admin Login</h1>

                <p className="mb-6 text-slate-600">
                    Computer Café Station Management
                </p>

                {error && (
                    <p className="mb-4 rounded bg-red-100 p-3 text-red-700">
                        {error}
                    </p>
                )}

                <label className="mb-1 block font-medium">Username</label>

                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="mb-4 w-full rounded border p-2"
                />

                <label className="mb-1 block font-medium">Password</label>

                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mb-6 w-full rounded border p-2"
                />

                <button
                    type="submit"
                    className="w-full rounded bg-blue-600 p-3 text-white"
                >
                    Login
                </button>
            </form>
        </main>
    );
}
