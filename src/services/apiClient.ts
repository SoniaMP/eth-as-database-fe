 const API_URL = "http://localhost:3000";
// const API_URL = "http://localhost:3000/api";

export async function apiRequest(endpoint: string, method = "GET", body: any = null) {
    let options: any = {
        method,
        headers: { "Content-Type": "application/json" },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}/${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`Error ${method} ${endpoint}: ${response.statusText}`);
    }

    return await response.json();
}
