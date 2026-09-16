const API_URL = "/api";

export async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,

        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const contentType = response.headers.get("content-type") || "";

    const result = contentType.includes("application/json")
        ? await response.json()
        : {};

    if (!response.ok) {
        const error = new Error(result.message || "Something went wrong.");

        error.validationErrors = result.errors || {};

        throw error;
    }

    return result;
}
