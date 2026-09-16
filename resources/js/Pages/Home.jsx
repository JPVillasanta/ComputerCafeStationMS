import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="mx-auto max-w-6xl p-6">
            <section className="rounded-lg bg-white p-8 shadow">
                <h1 className="mb-3 text-4xl font-bold">
                    Computer Café Station Management
                </h1>

                <p className="mb-8 text-slate-600">
                    Manage the digital catalog of PC rental workstations.
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                    <Link
                        to="/stations"
                        className="rounded-lg bg-blue-600 p-6 text-white"
                    >
                        <h2 className="text-xl font-bold">Station List</h2>

                        <p>View all café workstations.</p>
                    </Link>

                    <Link
                        to="/stations/create"
                        className="rounded-lg bg-emerald-600 p-6 text-white"
                    >
                        <h2 className="text-xl font-bold">Add Station</h2>

                        <p>Register a new workstation.</p>
                    </Link>

                    <div className="rounded-lg bg-slate-700 p-6 text-white">
                        <h2 className="text-xl font-bold">Station Details</h2>

                        <p>Open a station from the Station List.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
