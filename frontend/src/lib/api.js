const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export async function api(path, options = {}) {
  const response = await fetch(`${apiUrl}${path}`, { ...options, headers: { Accept: "application/json", ...options.headers } });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json();
}

export const catalogApi = {
  books: (query = "") => api(`/books${query ? `?${query}` : ""}`),
  book: (slug) => api(`/books/${slug}`),
  categories: () => api("/categories"),
  search: (query = "") => api(`/search${query ? `?${query}` : ""}`),
};
