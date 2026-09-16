import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiRequest } from "../../api";

export default function Index() {
    const location = useLocation();

    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadStations();
    }, []);

    async function loadStations() {
        setLoading(true);
        setError("");

        try {
            const result = await apiRequest("/stations");
            setStations(result.stations);
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="mx-auto max-w-6xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Station List</h1>

            {location.state?.success && (
                <p className="mb-4 rounded bg-green-100 p-3 text-green-700">
                    {location.state.success}
                </p>
            )}

            {loading && (
                <p className="rounded bg-blue-100 p-3 text-blue-700">
                    Loading stations...
                </p>
            )}

            {error && (
                <div className="rounded bg-red-100 p-3 text-red-700">
                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={loadStations}
                        className="mt-2 rounded bg-red-700 px-3 py-1 text-white"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {!loading && !error && stations.length === 0 && (
                <p className="rounded bg-white p-6 shadow">
                    No stations have been added.
                </p>
            )}

            {!loading && !error && stations.length > 0 && (
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <table className="w-full text-left">
                        <thead className="bg-slate-200">
                            <tr>
                                <th className="p-3">Station / PC</th>

                                <th className="p-3">Tier</th>

                                <th className="p-3">Hourly Rate</th>

                                <th className="p-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {stations.map((station) => (
                                <tr key={station.id} className="border-t">
                                    <td className="p-3 font-medium">
                                        {station.station_name}
                                    </td>

                                    <td className="p-3">
                                        {station.tier_category}
                                    </td>

                                    <td className="p-3">
                                        ₱
                                        {Number(station.hourly_rate).toFixed(2)}
                                    </td>

                                    <td className="p-3">
                                        <Link
                                            to={`/stations/${station.id}`}
                                            className="rounded bg-blue-600 px-3 py-2 text-white"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Link
                to="/stations/create"
                aria-label="Add Station"
                title="Add Station"
                className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-4xl text-white shadow-lg hover:bg-blue-700"
            >
                +
            </Link>
        </main>
    );
}
