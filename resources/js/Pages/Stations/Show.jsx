import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../../api";

export default function Show() {
    const { station } = useParams();

    const [stationData, setStationData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadStation();
    }, [station]);

    async function loadStation() {
        setLoading(true);
        setError("");

        try {
            const result = await apiRequest(`/stations/${station}`);

            setStationData(result.station);
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="mx-auto max-w-3xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Station Details</h1>

            {loading && (
                <p className="rounded bg-blue-100 p-3 text-blue-700">
                    Loading station details...
                </p>
            )}

            {error && (
                <p className="rounded bg-red-100 p-3 text-red-700">{error}</p>
            )}

            {!loading && !error && stationData && (
                <section className="rounded-lg bg-white p-6 shadow">
                    <dl className="space-y-4">
                        <div>
                            <dt className="font-semibold">
                                Station Name / PC Number
                            </dt>

                            <dd>{stationData.station_name}</dd>
                        </div>

                        <div>
                            <dt className="font-semibold">Tier / Category</dt>

                            <dd>{stationData.tier_category}</dd>
                        </div>

                        <div>
                            <dt className="font-semibold">Hourly Rate</dt>

                            <dd>
                                ₱{Number(stationData.hourly_rate).toFixed(2)}
                            </dd>
                        </div>

                        <div>
                            <dt className="font-semibold">Date Added</dt>

                            <dd>
                                {new Date(
                                    stationData.created_at
                                ).toLocaleString()}
                            </dd>
                        </div>
                    </dl>

                    <Link
                        to="/stations"
                        className="mt-6 inline-block rounded bg-slate-600 px-4 py-2 text-white"
                    >
                        Back to Station List
                    </Link>
                </section>
            )}
        </main>
    );
}
