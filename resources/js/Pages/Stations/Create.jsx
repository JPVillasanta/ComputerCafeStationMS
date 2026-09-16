import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../../api";

const emptyForm = {
    station_name: "",
    tier_category: "Regular",
    hourly_rate: "",
};

export default function Create() {
    const navigate = useNavigate();

    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [requestError, setRequestError] = useState("");

    function updateField(field, value) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    function fieldError(field) {
        const error = errors[field];

        if (Array.isArray(error)) {
            return error[0];
        }

        return error;
    }

    function validateForm() {
        const newErrors = {};

        if (!form.station_name.trim()) {
            newErrors.station_name = "Station name or PC number is required.";
        }

        if (!form.tier_category) {
            newErrors.tier_category = "Tier or category is required.";
        }

        if (form.hourly_rate === "") {
            newErrors.hourly_rate = "Hourly rate is required.";
        } else if (Number(form.hourly_rate) < 0) {
            newErrors.hourly_rate = "Hourly rate cannot be negative.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function submitForm(event) {
        event.preventDefault();
        setRequestError("");

        if (!validateForm()) {
            return;
        }

        setSaving(true);

        try {
            await apiRequest("/stations", {
                method: "POST",
                body: JSON.stringify(form),
            });

            navigate("/stations", {
                state: {
                    success: "Station added successfully.",
                },
            });
        } catch (error) {
            setRequestError(error.message);
            setErrors(error.validationErrors);
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="mx-auto max-w-3xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Add Station</h1>

            <form
                onSubmit={submitForm}
                className="rounded-lg bg-white p-6 shadow"
            >
                {requestError && (
                    <p className="mb-4 rounded bg-red-100 p-3 text-red-700">
                        {requestError}
                    </p>
                )}

                <label className="mb-1 block font-medium">
                    Station Name / PC Number
                </label>

                <input
                    type="text"
                    value={form.station_name}
                    onChange={(event) =>
                        updateField("station_name", event.target.value)
                    }
                    placeholder="PC-01"
                    className="w-full rounded border p-2"
                />

                {fieldError("station_name") && (
                    <p className="mb-4 mt-1 text-sm text-red-600">
                        {fieldError("station_name")}
                    </p>
                )}

                <label className="mb-1 mt-4 block font-medium">
                    Tier / Category
                </label>

                <select
                    value={form.tier_category}
                    onChange={(event) =>
                        updateField("tier_category", event.target.value)
                    }
                    className="w-full rounded border p-2"
                >
                    <option value="Regular">Regular</option>

                    <option value="VIP">VIP</option>

                    <option value="Streaming Room">Streaming Room</option>
                </select>

                {fieldError("tier_category") && (
                    <p className="mb-4 mt-1 text-sm text-red-600">
                        {fieldError("tier_category")}
                    </p>
                )}

                <label className="mb-1 mt-4 block font-medium">
                    Hourly Rate
                </label>

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.hourly_rate}
                    onChange={(event) =>
                        updateField("hourly_rate", event.target.value)
                    }
                    placeholder="50.00"
                    className="w-full rounded border p-2"
                />

                {fieldError("hourly_rate") && (
                    <p className="mb-4 mt-1 text-sm text-red-600">
                        {fieldError("hourly_rate")}
                    </p>
                )}

                <div className="mt-6 flex gap-2">
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Station"}
                    </button>

                    <Link
                        to="/stations"
                        className="rounded bg-slate-500 px-4 py-2 text-white"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </main>
    );
}
