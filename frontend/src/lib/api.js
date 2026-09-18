const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export async function api(path, options = {}) {
  const response = await fetch(`${apiUrl}${path}`, { ...options, headers: { Accept: "application/json", ...options.headers } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || `API request failed: ${response.status}`);
    error.status = response.status;
    error.data = payload;
    throw error;
  }
  return payload;
}

export const catalogApi = {
  books: (query = "") => api(`/books${query ? `?${query}` : ""}`),
  book: (slug) => api(`/books/${slug}`),
  categories: () => api("/categories"),
  search: (query = "") => api(`/search${query ? `?${query}` : ""}`),
};
